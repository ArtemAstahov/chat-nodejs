var log = require('lib/log')(module);
var config =require('config');
var connect = require('connect');
var cookie = require('cookie');
var async = require('async');
var sessionStore = require('lib/sessionStore');
var HttpError = require('error').HttpError;
var User = require('models/user').User;
var Message = require('models/message').Message;

function loadSession(sid, callback) {
    sessionStore.load(sid, function(err, session) {
        if(arguments.length == 0) {
            return callback(null, null);
        } else {
            return callback(null, session);
        }
    });
}

function loadUser(session, callback) {
    if(!session.user) {
        log.debug("Session %s is anonymous", session.id);
        return callback(null, null);
    }

    log.debug("retriving user ", session.user);

    User.findById(session.user, function(err, user) {
        if(err) return callback(err);

        if(!user) {
            return callback(null, null);
        }

        log.debug("user findbyId result: " + user);
        callback(null, user);
    });
}

module.exports = function(server) {
    var io = require('socket.io').listen(server);

    io.set('logger', log);

    io.set('authorization', function(handshake, callback) {
        async.waterfall([
            function(callback) {
                handshake.cookies = cookie.parse(handshake.headers.cookie || '');
                var sidCookie = handshake.cookies[config.get('session:key')];
                var sid = connect.utils.parseSignedCookie(sidCookie, config.get('session:secret'));

                loadSession(sid, callback);
            },
            function(session, callback) {
                if(!session) {
                    callback(new HttpError(401, "No session"));
                }

                handshake.session = session;
                loadUser(session, callback);
            },
            function(user, callback) {
                if(!user) {
                    callback(new HttpError(403, "Anonymous session may not connect"))
                }

                handshake.user = user;
                callback(null);
            }
        ], function(err) {
            if(!err) {
                return callback(null, true);
            }

            if(err instanceof HttpError) {
                return callback(null, false);
            }

            callback(err);
        });
    });


    io.sockets.on('session:reload', function(sid) {
        var clients = io.sockets.clients();

        clients.forEach(function(client) {
            if(client.handshake.session.id != sid) return;

            loadSession(sid, function(err, session) {
                if(err) {
                    client.emit("error", "server error");
                    client.disconect();
                    return;
                }

                if(!session) {
                    client.emit("logout");
                    client.disconnect();
                    return;
                }

                client.handshake.session = session;
            });
        });
    });

    io.sockets.on('connection', function (socket) {
        var username = socket.handshake.user.get('username');
        var userId = socket.handshake.user.get('_id');
        var picture = socket.handshake.user.get('picture');

        var clients = io.sockets.clients();

        var usersInfo = [];
        clients.forEach(function(client) {
                var obj = {
                    username: client.handshake.user.get('username'),
                    id: client.handshake.user.get('id')
                }
                usersInfo.push(obj);
        });

        socket.broadcast.emit('addUser', usersInfo);

        socket.broadcast.emit('join', username);
        socket.emit('login', username, picture);

        socket.on('message', function(text, cb) {
            socket.broadcast.emit('message', username, text, picture);
            Message.addMessage(userId, text);
            cb && cb();
        });

        socket.on('disconnect', function() {
            socket.broadcast.emit('leave', username);
        });
    });

    return io;
};

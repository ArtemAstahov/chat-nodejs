var Message = require('models/message').Message;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;
var async = require('async');

exports.get = function(req, res) {
    res.render('chat');
};

exports.post = function(req, res, next) {
    Message.find({}, function(err, message){
        if(err) {
            return next(err);
        }
        res.send(JSON.stringify(message));
    });
}
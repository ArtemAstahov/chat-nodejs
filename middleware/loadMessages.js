var Message = require('models/message').Message;

module.exports = function(req, res, next) {
    req.messages = res.locals.messages = null;

    Message.find({}, function(err, message){
        req.messages = res.locals.messages = JSON.stringify(message);
        next();
    });

};
var Message = require('models/message').Message;

module.exports = function(req, res, next) {
//    var messages;
    req.messages = res.locals.messages = 'qwerty';

    Message.find({}, function(err, message){
        req.messages = res.locals.messages = JSON.stringify(message);
        console.log(JSON.stringify(message));
        console.log(112232313131231231231);
        next();
    });

};
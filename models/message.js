var mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.statics.addMessage = function(userId, message, callback) {
    var Message = this;
    var user = new Message({userId: userId, message: message});
    user.save();
}

exports.Message = mongoose.model('Message', schema);


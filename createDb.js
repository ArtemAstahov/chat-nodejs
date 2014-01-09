var mongoose = require('lib/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers,
    createMessages
], function(err) {
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('models/user');
    require('models/message');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {

    var users = [
        {username: 'Вася', password: 'supervasya'},
        {username: 'Петя', password: '123'},
        {username: 'admin', password: 'thetruehero'}
    ];

    async.each(users, function(userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}

function createMessages(callback) {
    var messages = [
        {userId: '1', message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi minima enim perspiciatis expedita beatae earum deleniti aperiam vel nobis nesciunt repellat ex harum quod dolorem hic. Iste ex velit obcaecati nisi voluptates dolorum nam accusamus numquam veniam corporis. Excepturi perspiciatis ex optio dolore inventore blanditiis animi. Suscipit pariatur corporis itaque.'},
        {userId: '2', message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum reiciendis?'},
        {userId: '1', message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident deleniti ut similique mollitia aliquam saepe ad placeat nihil vel enim quo nobis at eligendi magni?'},
        {userId: '2', message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste eos hic quas sequi debitis soluta similique maxime iure reiciendis odio.'}
    ]

    async.each(messages, function(messageData, callback) {
        var message = new mongoose.models.Message(messageData);
        message.save(callback);
    }, callback);

}

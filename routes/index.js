var checkAuth = require('middleware/checkAuth');
var loadMessages = require('middleware/loadMessages');

module.exports = function(app) {

    app.get('/', require('./frontpage').get);

    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.post('/logout', require('./logout').post);

    app.get('/chat', checkAuth, loadMessages, require('./chat').get);
};

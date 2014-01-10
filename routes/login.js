var User = require('models/user').User;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;
var async = require('async');
var fs = require('fs');
var crypto = require('crypto');

exports.get = function(req, res) {
  res.render('login');
};



exports.post = function(req, res, next) {
    function fileUpload(req) {
        if(!req.files || !req.files.picture || !req.files.picture.name) {
            return req.body.currentPicture || '';
        }
        var data = fs.readFileSync(req.files.picture.path);
        var fileName = req.files.picture.name;
        var uid = crypto.randomBytes(10).toString('hex');
        var dir = __dirname + "/../public/uploads/" + uid;
        fs.mkdirSync(dir, '0777');
        fs.writeFileSync(dir + "/" + fileName, data);
        return '/uploads/' + uid + "/" + fileName;
    }

    var username = req.body.username;
    var password = req.body.password;
    var picture = fileUpload(req) || '';


    User.authorize(username, password, picture, function(err, user) {
        if(err) {
            if(err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});
    });


}

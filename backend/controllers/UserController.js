var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var multer  = require('multer');
// var profile_image = uploads.fields([{name: 'profile_image', maxCount: 1}]);
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());
var User = require('./User');
var sanban = require('../functions');

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.business_email +" was deleted.");
    });
});
// UPDATES PASSWORD
router.put('/change_pwd', function (req, res) {
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        User.findOneAndUpdate({ "_id": req.body.user_id }, { "$set": { "password": req.body.password}}).exec(function(err, user){
           if(err) {
               console.log(err);
               res.status(500).send(err);
           } else {
                    res.status(200).send(user);
           }
        });
 }
});
// UPDATES A SINGLE USER IN THE DATABASE
router.put('/update', function (req, res) {
    if (!req.body.password) {
        User.findByIdAndUpdate(req.body.user_id, req.body, {new: true}, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            res.status(200).send(user);
        });
    }
});
module.exports = router;

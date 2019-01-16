/**
* @author Sandeep Bangarh <sanbangarh309@gmail.com>
*/
"use strict"
var Venue = require('./controllers/Product');
var Country = require('./controllers/User');
var config = require('./config');
var ObjectId = require('mongodb').ObjectID;
var moment = require('moment');
module.exports = {
  sanImageUpload : function(req, res, id) {
    var fs = require('fs');
    var path = require('path');
    var formidable = require("formidable");
    var appDir = path.dirname(require.main.filename);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (files.img.name !='') {
        var oldpath = files.img.path;
        var newpath = appDir+'/uploads/' + files.img.name;
        fs.rename(oldpath, newpath);
        res.json(files.img.name);
      }else{
        res.json('failed');
      }

    });
  },

  decodeBase64Image : function (dataString)
  {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var response = {};

    if (matches.length !== 3)
    {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
  },

  uploadBase64Image : function(base64Data,sb){
    var imageTypeRegularExpression      = /\/(.*?)$/;
    // Generate random string
    var uniqueSHA1String = module.exports.san_Password()
    var imageBuffer = module.exports.decodeBase64Image(base64Data);
    var uploafdf_dir = config.directory + "/uploads/products/";
    var uniqueRandomImageName = 'image-' + uniqueSHA1String;
    // This variable is actually an array which has 5 values,
    // The [1] value is the real image extension
    var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);
    var userUploadedImagePath = uploafdf_dir + uniqueRandomImageName + '.' + imageTypeDetected[1];
    var filename = uniqueRandomImageName + '.' + imageTypeDetected[1];
    try
    {
      require('fs').writeFile(userUploadedImagePath, imageBuffer.data,
        function()
        {
          // console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath);
          sb(filename);
        });
      }
      catch(error)
      {
        sb('')
      }
  },

  sanGenerateQRCode : function(req, res,id, callback) {
    var qr = require('qr-image');
    var realpath = 'http://'+req.headers.host+'/files/qrcodes/'+ObjectId(id)+'.png';
    var path = config.directory+'/uploads/qrcodes/'+ObjectId(id)+'.png';
    var qr_svg = qr.image(ObjectId(id)+'san@#ban', { type: 'png' });
    qr_svg.pipe(require('fs').createWriteStream(path));
    callback(realpath);
  },

  sanSendMessage : function(req, res, id) {
    var message = new gcm.Message({
      priority: 'high',
      contentAvailable: true,
      delayWhileIdle: true,
      timeToLive: 3,
      data: { key1: 'msg1', key2: 'message2'},
      notification: {
        title: "Hello, World",
        icon: "ic_launcher",
        body: "This is a notification that will be displayed if your app is in the background."
      }
    });
    // message.addData('key1','message1');
    var registrationTokens = [];
    registrationTokens.push('regToken1');
    sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
      if (err) console.error(err);
      else console.log(response);
    });
  },

  sanBusinessUsers : function(req, res, userid, callback) {
    User.find({_id:userid}, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the events.");
      if (!user) return res.status(404).send("No user found.");
      module.exports.sanGetEvents(req, res, user[0]._id, function(events) {
        var userdata = {
          user: user,
          events: events
        };
        callback(userdata);
      });
    }).sort( { _id: -1 } );
  },

  sanRemoveDuplicates : function(originalArray, prop){
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  },

  sanGetModelById : function(req,res,next,id){
    Model.where({_id: id}).findAsync().then(function(model) {
      return model;
    }).catch(next).error(console.error);
  },

  san_middleware : function(req, res,next){
    var token = req.session.token;
    if (!token && req.path != '/admin/login' && !req.path.includes("assets")){
      return res.redirect('login');
    }
    next();
  },

  san_Password : function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },

  sanKey : function(req, res, next) {
    res.json("78d88993fd997052c0e58415a838b30e2a459b21");
  }
}

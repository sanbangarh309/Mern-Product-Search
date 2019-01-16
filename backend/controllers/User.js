var mongoose = require('mongoose');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
var UserSchema = new mongoose.Schema({
  name:String,
  email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
  country:String,
  city:String,
  first_name:String,
  last_name:String,
  phone:String,
  password: String,
  status: Number,
  image: String,
  created_date:{ type: Date, default: null }
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');

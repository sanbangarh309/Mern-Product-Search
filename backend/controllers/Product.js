var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  // user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
  user_id: {type: String,required: true},
  name: String,
  price: String,
  description:String,
  qty:Number,
  color:String,
  images:[],
  qrcode:String,
  created_date:{ type: Date, default: Date.now }
});
mongoose.model('Product', ProductSchema);
module.exports = mongoose.model('Product');

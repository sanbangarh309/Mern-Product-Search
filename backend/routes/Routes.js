'use strict';
module.exports = function(app) {
	var config = require('../config');
	var sanban = require('../functions');
	var VerifyToken = sanban.san_middleware//require('../../auth/VerifyToken');
	var Product = require('../controllers/Product');
	var User = require('../controllers/User');
	var moment = require('moment');

	/* Get File Path */
	app.get('/files/:type/:img_name', function(req,res){
		var filename = req.params.img_name;
		var type = req.params.type;
		var ext  = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
		if (!ext) {
			ext = 'jpg';
		}
		if (ext == 'svg') {
			ext = 'svg+xml';
		}
		var fs = require('fs');
		var imageDir = config.directory+'/uploads/'+type+'/';
		fs.readFile(imageDir + filename, function (err, content) {
			if (err) {
				res.writeHead(400, {'Content-type':'text/html'})
				res.end("No such image");
			} else {
				//specify the content type in the response will be an image
				res.writeHead(200,{'Content-type':'image/'+ext});
				res.end(content);
			}
		});
	});


	app.get('/admin/calc', function(req,res){
		res.render(config.directory + '/views/partials/venue_cal', {
			venue_id:req.query.venue_id,
			page: 'venues'
		});
	});

	app.get("/getData", (req, res) => {
	  Product.find((err, data) => {
	    if (err) return res.json({ success: false, error: err });
	    return res.json({ success: true, data: data });
	  });
	});

	// this is our update method
	// this method overwrites existing data in our database
	app.post("/updateData", (req, res) => {
	  const { id, update } = req.body;
	  Product.findOneAndUpdate(id, update, err => {
	    if (err) return res.json({ success: false, error: err });
	    return res.json({ success: true });
	  });
	});

	// this is our delete method
	// this method removes existing data in our database
	app.delete("/deleteData", (req, res) => {
	  const { id } = req.body;
	  Product.findOneAndDelete(id, err => {
	    if (err) return res.send(err);
	    return res.json({ success: true });
	  });
	});

	// this is our create methid
	// this method adds new data in our database
	app.post("/add_product", (req, res) => {
		console.log(req.body);
		res.json(req.body);
	  let data = new Product();
	  // const { name, price } = req.body;
	  // if ((!id && id !== 0) || !message) {
	  //   return res.json({
	  //     success: false,
	  //     error: "INVALID INPUTS"
	  // });
	  // }
	  // data.user_id = 1;
	  // data.name = req.body.product_name;
	  // data.price = req.body.price;
	  // data.description = message;
	  // data.qty = 1;
	  // data.color = 'blue';
	  // data.save(err => {
	  //   if (err) return res.json({ success: false, error: err });
	  //   return res.json({ success: true });
	  // });
	});
};

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports = module.exports = function(app, mongoose) {
	var paymentSchema = new mongoose.Schema({
	  client:   { type: Schema.Types.ObjectId, ref: 'user' },
	  //client:   { type: String },
		amount: 	{ type: Number, required : true },
		method: 	{	type: String,
          			enum: ['Cash', 'Fees']
          		},
		date:     { type: Date, default: Date.now },
		service:  {
	    method: {
  			type: String,
  			enum: ['Monthly', 'Lesson']
  		}
		},
		clerk: { type: String }
	});
	mongoose.model('payment', paymentSchema);
};
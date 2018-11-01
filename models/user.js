exports = module.exports = function(app, mongoose) {

	var userSchema = new mongoose.Schema({
	    //_id :       { type: String },
	    cc :        { type: String, unique : true, required : true },
		name: 		{ type: String },
		email: 		{ type: String, unique : true, required : true },
		phone: 		{ type: Number },
		address: 	{ type: String },
		balance:	{ type: Number },
		active:		{ type: Boolean },
		arrears:	{ type: Boolean },
		birth:      { type: Date },
		entry:      { type: Date, default: Date.now },
		discount: {
		    percent: { type: Number },
		    description: { type: String }
		},
		condition: {
		    weight: { type: Number },
		    height: { type: Number },
		    bmi: { type: Number },
		    injuries: { type: String },
		}
	});

	mongoose.model('user', userSchema);

};
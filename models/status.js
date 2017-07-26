var mongoose = require('mongoose');

var StatusSchema = mongoose.Schema({
	username : {
		type : String,
		required : true
	},
	free : {
		type : Boolean,
		default : false,
		required : true
	},
	goesTo : [String],
	dept : String
});

var Status = module.exports = mongoose.model('Status', StatusSchema);
var mongoose = require('mongoose');

var ReplaceSchema = mongoose.Schema({
	username : {
		type : String,
		required : true
	},
	dept : {
		type : String,
		required : true
	},
	time : {
		type : String,
		required : true
	},
	class : {
		type : String,
		required : true
	},
	subjectCode : {
		type : String,
		required : true
	},
	takenBy : {
		type : String,
		default : 'none',
		required : true
	}
});

var Replace = module.exports = mongoose.model('Replace', ReplaceSchema);

module.exports.addReplace = (newReplace, callback) => {
	newReplace.save(callback);
}
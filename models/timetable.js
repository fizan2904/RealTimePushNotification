var mongoose = require('mongoose');

var TableSchema = mongoose.Schema({
	username : {
		type : String,
		required : true
	},
	monday : [{
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
		}
	}],
	tuesday : [{
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
		}
	}],
	wednesday : [{
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
		}
	}],
	thursday : [{
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
		}
	}],
	friday : [{
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
		}
	}],
	live : {
		type : Boolean,
		default : true
	}
});

var TimeTable = module.exports = mongoose.model('TimeTable', TableSchema);

module.exports.saveTable = function(newTable, callback){
	newTable.save(callback);
}

module.exports.findTable = function(username, callback){
	TimeTable.findOne({ username : username }, callback);
}

module.exports.getTableByDay = function(username, day, callback){
	TimeTable.findOne({ username : username }, day, callback);
}
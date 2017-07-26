var mongoose = require('mongoose'),
	bcrypt = require('bcryptjs');

var StudentSchema = mongoose.Schema({
	username : {
		type : String,
		required : true
	},
	firstname : {
		type : String,
		required : true
	},
	lastname : String,
	reg_no : {
		type : String,
		required : true
	},
	phone : {
		type : Number,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	pass : {
		type : String,
		required : true
	}
});

var Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt){
		if (err) throw err;
		bcrypt.hash(newUser.pass, salt, function(err, hash){
			newUser.pass = hash;
			newUser.save(callback);
		});
	});
}

module.exports.comparePasswords = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if (err) throw err;
		callback(null, isMatch);
	})
}

module.exports.findUserById = function(id, callback){
	Student.findOne({ _id : id }, callback);
}

module.exports.findUserByUsername = function(username, callback){
	Student.findOne({ username : username }, callback);
}

module.exports.findUserByEmail = function(email, callback){
	Student.findOne({ email : email }, callback);
}
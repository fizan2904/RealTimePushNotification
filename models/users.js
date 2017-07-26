var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	username : {
		type : String,
		required : true
	},
	firstname : {
		type : String,
		required : true
	},
	lastname : String,
	email : {
		type : String,
		required : true
	},
	pass : {
		type : String,
		required : true
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt){
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
	});
}

module.exports.findUserByEmail = function(email, callback){
	User.findOne({ email : email }, callback);
}

module.exports.findUserByUsername = function(username, callback){
	User.findOne({ username : username }, callback);
}

module.exports.findUserById = function(id, callback){
	User.findOne({ _id : id }, callback);
}
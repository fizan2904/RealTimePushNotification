var router = require('express').Router(),
	Student = require('../models/studentMgmt');
	/*passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

function ensureAuth(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect('/student/login');
	}
}

router.get('/login', (req, res) => {
	if(req.isAuthenticated()){
		res.redirect('/student/dash');
	}
	res.render('studLogin.html');
});

router.get('/register', (req, res) => {
	if(req.isAuthenticated()){
		res.redirect('/student/dash');
	}
	res.render('studReg.html');
});

router.post('/register', (req, res) => {

	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('firstname', 'Firstname is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is incorrect').isEmail();
	req.checkBody('phone', 'Phone number is required').notEmpty();
	req.checkBody('phone', 'Unknown Phone format').isInt();
	req.checkBody('reg_no', 'Register number is required').notEmpty();
	req.checkBody('pass', 'Password is required').notEmpty();
	req.checkBody('pass1', 'Password verification is required').notEmpty();
	req.checkBody('pass', 'Passwords don\'t match').equlas(req.body.pass1);

	var errors = req.validationErrors();
	if(errors){
		res.send(errors);
	}

	Student.findUserByUsername(req.body.username, (err, docs) => {
		if(err) throw err;
		if(docs){
			req.flash('error_msg', 'Username already in use');
			res.redirect('/student/register');
		}
		Student.findUserByEmail(req.body.email, (err, mails) => {
			if(err) throw err;
			if(mails){
				req.flash('error_msg', 'Email already in use');
				res.redirect('/student/register');
			}
			Student.findUserByPhone(req.body.phone, (err, phones) => {
				if(err) throw err;
				if(phones){
					req.flash('error_msg', 'Phone number already in use');
					res.redirect('/student/register');
				}
				Student.findOne({ reg_no : req.body.reg_no }, (err, docs) => {
					if(err) throw err;
					if(docs){
						req.flash('error_msg', 'Register number already in use');
						res.redirect('/student/register');
					}
					var newUser = new Student({
						username : req.body.username,
						firstname : req.body.firstname,
						lastname : req.body.lastname,
						reg_no : req.body.reg_no,
						phone : req.body.phone,
						email : req.body.email,
						pass : req.body.pass
					});
					Student.createUser(newUser, (err) => {
						if (err) throw err;
						res.redirect('/student/login');
					});
				});
			});
		});
	});
});

passport.use(new LocalStrategy(
  function(username, pass, done) {
    Student.findUserByUsername(username, function(err, user){
    	if(err) throw err;
    	if(!user){
    		return done(null, false, {message : 'Credentials don\'t match'});
    	}
    	var user = user;
    	Student.comparePasswords(pass, user.pass, function(err, isMatch){
    		if(err) throw err;
    		if(isMatch){
    			return done(null, user);
    		}else{
    			return done(null, false, {message: 'Credentials don\'t match'});
    		}
    	});
    });
  }
));

passport.serializeUser(function(user, done) {
	var sessionUser = { 
	  	_id: user._id,
	  	username: user.username,
	  	reg_no : user.reg_no,
	  	email: user.email
	}
	done(null, sessionUser)
});

passport.deserializeUser(function(id, done) {
  User.findUserById(id, function(err, sessionuser) {
    done(err, sessionuser);
  });
});

router.post('/login',passport.authenticate('local',{ successRedirect:'/dashboard',failureRedirect:'/user/login',failureFlash: true}));

router.get('/logout', ensureAuth, (req, res) => {
	req.session.destroy(function (err) {
    	res.redirect('/user/login');
  	});
}) */

module.exports = router;
var router = require('express').Router(),
	User = require('../models/users'),
	passport = require('passport');
	LocalStrategy = require('passport-local').Strategy;

function auth(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect('/login');
	}
}

router.get('/logout', function(req, res){
	req.session.destroy(function (err) {
    	res.redirect('/user/login');
  	});
});

router.get('/login', function(req, res){
	if(req.isAuthenticated()){
		res.render('teachDash.html');
	}else{
		res.render('login.html');
	}
});

router.get('/register', function(req, res){
	if(req.isAuthenticated()){
		res.redirect('/GetRegisterErrors');
	}else{
		res.render('register.html');
	}
});

router.post('/register', function(req, res){
	if(req.isAuthenticated()){
		res.redirect('/PostRegisterErrors');
	}else{

		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('firstname', 'Firstname is required').notEmpty();
		req.checkBody('email', 'Email is required').notEmpty();
		req.checkBody('email', 'Email is not proper').isEmail();
		req.checkBody('pass', 'Password is required').notEmpty();
		req.checkBody('pass1', 'Confirm Password is required').notEmpty();
		req.checkBody('pass', 'Passwords do not match').equals(req.body.pass1);

		var errors = req.validationErrors();
		if(errors){
			res.send(errors);
		}

		User.findUserByUsername(req.body.username, function(err, docs){
			if(docs){
				res.send('Username already in use');
			}else{
				User.findUserByEmail(req.body.email, function(err, mails){
					if(mails){
						res.send('Email already in use');
					}else{
						var newUser = new User({
							username : req.body.username,
							firstname : req.body.firstname,
							lastname : req.body.lastname,
							email : req.body.email,
							pass : req.body.pass
						});

						User.createUser(newUser, function(err){
							if (err) throw err;
							res.redirect('/user/login');
						});
					}
				});
			}
		});
	}
});

passport.use(new LocalStrategy(
  function(username, pass, done) {
    User.findUserByUsername(username, function(err, user){
    	if(err) throw err;
    	if(!user){
    		return done(null, false, {message : 'Credentials don\'t match'});
    	}
    	var user = user;
    	User.comparePasswords(pass, user.pass, function(err, isMatch){
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

module.exports = router;
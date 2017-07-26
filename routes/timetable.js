var router = require('express').Router(),
	Table = require('../models/timetable'),
	User = require('../models/users');

function ensureAuth(req, res, next){
	if(req.session.passport === undefined){
		res.redirect('/user/login');
	}else{
		return next();		
	}
}

router.get('/uploadTable', ensureAuth, function(req, res){
	res.render('uploadTable.html');
});

router.post('/uploadTable', ensureAuth, function(req, res){
	var monday = [{
		time : '8:00-8:50',
		class : req.body.monclass0,
		subjectCode : req.body.monsub0
	},{
		time : '8:50-9:40',
		class : req.body.monclass1,
		subjectCode : req.body.monsub1
	},{
		time : '10:00-10:50',
		class : req.body.monclass2,
		subjectCode : req.body.monsub2
	},{
		time : '10:50-11:40',
		class : req.body.monclass3,
		subjectCode : req.body.monsub3
	},{
		time : '12:30-13:20',
		class : req.body.monclass4,
		subjectCode : req.body.monsub4
	},{
		time : '13:20-14:10',
		class : req.body.monclass5,
		subjectCode : req.body.monsub5
	},{
		time : '14:10-15:00',
		class : req.body.monclass6,
		subjectCode : req.body.monsub6
	}];
	var tuesday = [{
		time : '8:00-8:50',
		class : req.body.tueclass0,
		subjectCode : req.body.tuesub0
	},{
		time : '8:50-9:40',
		class : req.body.tueclass1,
		subjectCode : req.body.tuesub1
	},{
		time : '10:00-10:50',
		class : req.body.tueclass2,
		subjectCode : req.body.tuesub2
	},{
		time : '10:50-11:40',
		class : req.body.tueclass3,
		subjectCode : req.body.tuesub3
	},{
		time : '12:30-13:20',
		class : req.body.tueclass4,
		subjectCode : req.body.tuesub4
	},{
		time : '13:20-14:10',
		class : req.body.tueclass5,
		subjectCode : req.body.tuesub5
	},{
		time : '14:10-15:00',
		class : req.body.tueclass6,
		subjectCode : req.body.tuesub6
	}];
	var wednesday = [{
		time : '8:00-8:50',
		class : req.body.wedclass0,
		subjectCode : req.body.wedsub0
	},{
		time : '8:50-9:40',
		class : req.body.wedclass1,
		subjectCode : req.body.wedsub1
	},{
		time : '10:00-10:50',
		class : req.body.wedclass2,
		subjectCode : req.body.wedsub2
	},{
		time : '10:50-11:40',
		class : req.body.wedclass3,
		subjectCode : req.body.wedsub3
	},{
		time : '12:30-13:20',
		class : req.body.wedclass4,
		subjectCode : req.body.wedsub4
	},{
		time : '13:20-14:10',
		class : req.body.wedclass5,
		subjectCode : req.body.wedsub5
	},{
		time : '14:10-15:00',
		class : req.body.wedclass6,
		subjectCode : req.body.wedsub6
	}];
	var thursday = [{
		time : '8:00-8:50',
		class : req.body.thuclass0,
		subjectCode : req.body.thusub0
	},{
		time : '8:50-9:40',
		class : req.body.thuclass1,
		subjectCode : req.body.thusub1
	},{
		time : '10:00-10:50',
		class : req.body.thuclass2,
		subjectCode : req.body.thusub2
	},{
		time : '10:50-11:40',
		class : req.body.thuclass3,
		subjectCode : req.body.thusub3
	},{
		time : '12:30-13:20',
		class : req.body.thuclass4,
		subjectCode : req.body.thusub4
	},{
		time : '13:20-14:10',
		class : req.body.thuclass5,
		subjectCode : req.body.thusub5
	},{
		time : '14:10-15:00',
		class : req.body.thuclass6,
		subjectCode : req.body.thusub6
	}];
	var friday = [{
		time : '8:00-8:50',
		class : req.body.friclass0,
		subjectCode : req.body.frisub0
	},{
		time : '8:50-9:40',
		class : req.body.friclass1,
		subjectCode : req.body.frisub1
	},{
		time : '10:00-10:50',
		class : req.body.friclass2,
		subjectCode : req.body.frisub2
	},{
		time : '10:50-11:40',
		class : req.body.friclass3,
		subjectCode : req.body.frisub3
	},{
		time : '12:30-13:20',
		class : req.body.friclass4,
		subjectCode : req.body.frisub4
	},{
		time : '13:20-14:10',
		class : req.body.friclass5,
		subjectCode : req.body.frisub5
	},{
		time : '14:10-15:00',
		class : req.body.friclass6,
		subjectCode : req.body.frisub6
	}];

	var username = req.session.passport.user.username;

	var newTable = new Table({
		username : username,
		monday : monday,
		tuesday : tuesday,
		wednesday : wednesday,
		thursday : thursday,
		friday : friday,
		online : true
	});

	Table.saveTable(newTable, function(err){
		if (err) throw err;
		res.redirect('/dashboard');
	});
});

module.exports = router;
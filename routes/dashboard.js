var router = require('express').Router(),
	User = require('../models/users'),
	Table = require('../models/timetable');

function getday(){
	var d = new Date(),
	weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	var n = weekday[d.getDay()];
	return n;
}

function gethours(){
	var d = new Date(),
		hours = d.getHours();
}

function getmins(){
	var d = new Date(),
		hours = d.getMinutes();
}

function ensureAuth(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect('/user/login');
	}
}

router.get('/', ensureAuth, (req, res)=>{
	Table.findOne({ username : req.session.passport.user.username }, function(err, docs){
		if (err) throw err;
		if(docs){
			var date = getday();
		if(date == 'monday'){
			var reqDocs = docs.monday;
		}else if(date == 'tuesday'){
			var reqDocs = docs.tuesday;
		}else if(date == 'wednesday'){
			var reqDocs = docs.wednesday;
		}else if(date == 'thursday'){
			var reqDocs = docs.thursday;
		}else if(date == 'friday'){
			var reqDocs = docs.friday;
		}

		var date = new Date();

		var hrs = date.getHours();
		var mns = date.getMinutes();

		var comp = ['8:00-8:50','8:50-9:40','10:00-10:50','10:50-11:40','12:30-1:20','1:20-2:10','2:10-3:00'];
		var finalarr = [];
		for(var i=0;i<7;i++){
			var newComp = comp[i].split('-');
			var hr1 = newComp[0].split(':');
			var hrfirst = hr1[0];
			var mnsfirst = hr1[1];
			var hr2 = newComp[1].split(':');
			var hrsecond = hr2[0];
			var mnssecond = hr2[1];
			var currentD = new Date();
			var startHourD = new Date();
			startHourD.setHours(parseInt(hrfirst),parseInt(mnsfirst),0);
			var endHourD = new Date();
			endHourD.setHours(parseInt(hrsecond),parseInt(mnssecond),0);

			if(currentD >= startHourD && currentD < endHourD){
				var st = startHourD.getHours().toString();
				var st1 = endHourD.getHours().toString();
				var finst = comp[i];
				break; 	
			}
		}
		var finalDocs = reqDocs.find(o => o.time === finst);
			res.render('teachDash.html', { docs : finalDocs });
		}else{
			res.render('work.html');
		}
	});
});

router.get('/s', ensureAuth, (req, res)=>{
	Table.findOne({ username : req.session.passport.user.username }, function(err, docs){
		if (err) throw err;
		var date = getday();
		if(date == 'monday'){
			var reqDocs = docs.monday;
		}else if(date == 'tuesday'){
			var reqDocs = docs.tuesday;
		}else if(date == 'wednesday'){
			var reqDocs = docs.wednesday;
		}else if(date == 'thursday'){
			var reqDocs = docs.thursday;
		}else if(date == 'friday'){
			var reqDocs = docs.friday;
		}

		var date = new Date();

		var hrs = date.getHours();
		var mns = date.getMinutes();

		var comp = ['8:00-8:50','8:50-9:40','10:00-10:50','10:50-11:40','12:30-13:20','13:20-14:10','14:10-15:00'];
		var finalarr = [];
		for(var i=0;i<7;i++){
			var newComp = comp[i].split('-');
			var hr1 = newComp[0].split(':');
			var hrfirst = hr1[0];
			var mnsfirst = hr1[1];
			var hr2 = newComp[1].split(':');
			var hrsecond = hr2[0];
			var mnssecond = hr2[1];
			var currentD = new Date();
			var startHourD = new Date();
			startHourD.setHours(parseInt(hrfirst),parseInt(mnsfirst),0);
			var endHourD = new Date();
			endHourD.setHours(parseInt(hrsecond),parseInt(mnssecond),0);

			if(currentD >= startHourD && currentD < endHourD){
				var st = startHourD.getHours().toString();
				var st1 = endHourD.getHours().toString();
				var finst = comp[i];
				break; 	
			}
		}
		var finalDocs = reqDocs.find(o => o.time === finst);
		if(finalDocs === undefined){
			finalDocs = {
				time : '10:00-10:50',
				class : '2-a',
				subjectCode : 'ADA Lab'
			};
			res.send(finalDocs);
		}else{
			res.send(finalDocs);
		}
	});
});
module.exports = router;
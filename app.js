const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	ejs = require('ejs'),
	path = require('path'),
	expressValidator = require('express-validator'),
	flash = require('connect-flash-plus'),
	LocalStrategy = require('passport-local').Strategy,
	cron = require('node-cron');
 
mongoose.connect('mongodb://127.0.0.1/timetable');
const db = mongoose.connection;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', ejs);
app.engine('html', ejs.renderFile);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.text({ type : 'text/html' }));
app.use(cookieParser());
app.use(session({
	secret : 'fuwit7wryhwi4r74tgh',
	saveUninitialized : false,
	resave : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator({
	errorFormatter : function(param, msg, value){
		var namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;
		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}return{
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));
app.use(flash());
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('Error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});
var Replace = require('./models/replacement'),
	Table = require('./models/timetable');
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

cron.schedule('* * * * * *', () => {
	Replace.find({}, (err, docs) => {
		if(err) throw err;
		if(docs){
			console.log(docs[0].username);
		}
	});
	Table.findOne({ username : 'punitha' }, (err, docs) => {
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
				return;
			}else if(finalDocs.subjectCode == 'nil'){
				Table.findOneAndUpdate({ username : 'punitha' }, { $set : { live : false }}, (err) => {
					if (err) throw err;
				});
			}else{
				Table.findOneAndUpdate({ username : 'punitha' }, { $set : { live : true }}, (err) => {
					if (err) throw err;
				});
			}
		}
	});
});

var base = require('./routes/base');
var users = require('./routes/users');
var table = require('./routes/timetable');
var dash = require('./routes/dashboard');
var stud = require('./routes/studentsMgmt');
var replac = require('./routes/replacement');

app.use('/', base);
app.use('/user', users);
app.use('/table', table);
app.use('/dashboard', dash);
app.use('/student', stud);
app.use('/replace', replac);

app.listen(3000);
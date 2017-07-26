var router = require('express').Router();

router.route('/')

	.get(function(req, res){
		res.render('index.html');
	});

module.exports = router;
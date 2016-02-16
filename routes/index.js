var express = require('express');
var Yubikey = require('yubikey');

var gpioController = require('../gpioController');
var router = express.Router();
var yubicoClientID = 'GET KEY';
var yubicoSecretKey = 'GET SECRET';

/* GET home page. */
router.get('/', function(req, res, next) {	
	gpioController.readMagSensor(function (value) {
		res.render('index', { isDoorOpen: value });
	});  
});

router.post('/', function(req, res) {
    var yubikey = new Yubikey(yubicoClientID, yubicoSecretKey);
    yubikey.verify(req.body.publicKey, function (err) {
    	var success = false;
    	if (!err)
    	{
    		gpioController.toggleRelay();
    		success = true;
    	}
    	res.setHeader('Content-Type', 'application/json');
  		res.send(JSON.stringify({ success: success }));
    });
});

module.exports = router;

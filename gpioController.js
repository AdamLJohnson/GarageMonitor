var exec = require('child_process').exec;
var relayPin = 4;
var magSensorPin = 5;

var self = {
	startUp: startUp,
	toggleRelay: toggleRelay,
	readMagSensor: readMagSensor
};

function startUp () {
	exec("gpio mode " + relayPin + " output");	
	exec("gpio write " + relayPin + " 1");

	exec("gpio mode " + magSensorPin + " input");
	exec("gpio mode " + magSensorPin + " up");
}

function toggleRelay () {
	exec("gpio write " + relayPin + " 0", function (error, stdout, stderr) {
		setTimeout(function() {
			exec("gpio write " + relayPin + " 1");
		}, 500);
	});
}

function readMagSensor (cb) {
	exec("gpio read " + magSensorPin, function (error, stdout, stderr) {
		cb(stdout);
	});
}

module.exports = self;
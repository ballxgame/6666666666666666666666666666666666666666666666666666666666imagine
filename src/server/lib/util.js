/* jslint node: true */
'use strict';
var c = require('../../../config.json');

exports.addArticle = function(string) {
	return (/[aeiouAEIOU]/.test(string[0])) ? 'an ' + string : 'a ' + string;
};
exports.getDistance = function(p1, p2) {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};
exports.getDirection = function(p1, p2) {
	return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

exports.clamp = function(value, min, max) {
	return Math.min(Math.max(value, min), max);
};
exports.angleDifference = (() => {
	let mod = function(a, n) {
		return (a % n + n) % n;
	};
	return (sourceA, targetA) => {
		let a = targetA - sourceA;
		return mod(a + Math.PI, 2 * Math.PI) - Math.PI;
	};
})();
exports.loopSmooth = (angle, desired, slowness) => {
	return exports.angleDifference(angle, desired) / slowness;
};
exports.deepClone = (obj, hash = new WeakMap()) => {
	let result;
	if (Object(obj) !== obj || obj instanceof Function) return obj;
	if (hash.has(obj)) return hash.get(obj);
	try {
		result = new obj.constructor();
	} catch (e) {
		result = Object.create(Object.getPrototypeOf(obj));
	}
	if (obj instanceof Map) Array.from(obj, ([key, val]) => result.set(exports.deepClone(key, hash), exports.deepClone(val, hash)));
	else if (obj instanceof Set) Array.from(obj, (key) => result.add(exports.deepClone(key, hash)));
	hash.set(obj, result);
	return Object.assign(result, ...Object.keys(obj).map(
		key => ({
			[key]: exports.deepClone(obj[key], hash)
		})));
};
exports.averageArray = arr => {
	if (!arr.length) return 0;
	var sum = arr.reduce((a, b) => {
		return a + b;
	});
	return sum / arr.length;
};
exports.sumArray = arr => {
	if (!arr.length) return 0;
	var sum = arr.reduce((a, b) => {
		return a + b;
	});
	return sum;
};
exports.signedSqrt = x => {
	return Math.sign(x) * Math.sqrt(Math.abs(x));
};
exports.getJackpot = x => {
	return (x > 26300 * 1.5) ? Math.pow(x - 26300, 0.85) + 26300 : x / 1.5;
};
exports.serverStartTime = Date.now();
exports.time = () => {
	return Date.now() - exports.serverStartTime;
};

const SimpleNodeLogger = require('simple-node-logger');
const logger = SimpleNodeLogger.createRollingFileLogger({
	logDirectory: __dirname + '/../../../logs',
	fileNamePattern: 'diep2-<DATE>.log',
	dateFormat: 'YYYY-MM-DD',
	level: 'warn'
});

exports.log = text => {
	console.log('[' + (exports.time() / 1000).toFixed(3) + ']: ' + text);
	logger.info(text);
};
exports.warn = text => {
	console.log('[' + (exports.time() / 1000).toFixed(3) + ']: ' + '[WARN] ' + text);
	logger.warn(text);
};
exports.info = text => {
	console.log('[' + (exports.time() / 1000).toFixed(3) + ']: ' + '[INFO] ' + text);
	logger.warn(text);
};
exports.error = text => {
	console.log(text);
	logger.error(text);
};
exports.remove = (array, index) => {
	if (index === array.length - 1) return array.pop();
	else {
		let o = array[index];
		array[index] = array.pop();
		return o;
	}
};
/**
 * gps-time.js v1.0.1
 * https://github.com/davidcalhoun/gps-time.js
 *
 * Small utility to convert times between GPS epoch (midnight January 6, 1980) and
 * Unix epoch (midnight January 1, 1970), taking into account leap seconds.
 * 
 * Licensed under MIT (https://github.com/davidcalhoun/gps-time.js/blob/master/LICENSE)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.gpsTime = factory();
  }
}(this, function () {


// Public interface.
var exports = {};


// List of GPS leaps in milliseconds.  This will need to stay updated as new leap seconds are announced in
// the future.
var gpsLeapMS = [
  46828800000, 78364801000, 109900802000, 173059203000, 252028804000, 315187205000, 346723206000,
  393984007000, 425520008000, 457056009000, 504489610000, 551750411000, 599184012000, 820108813000,
  914803214000, 1025136015000, 1119744016000, 1167264017000
];


// Difference in time between Jan 1, 1970 (Unix epoch) and Jan 6, 1980 (GPS epoch).
var gpsUnixEpochDiffMS = 315964800000;


// Number of milliseconds in one second.
var msInSecond = 1000;


/**
 * Determines whether a leap second should be added.  Logic works slightly differently
 * for unix->gps and gps->unix.
 * @param {number} gpsMS GPS time in milliseconds.
 * @param {number} curGPSLeapMS Currenly leap represented in milliseconds.
 * @param {number} totalLeapsMS Total accumulated leaps in milliseconds.
 * @param {boolean} isUnixToGPS True if this operation is for unix->gps, falsy if gps->unix.
 * @return {boolean} Whether a leap second should be added.
 */
var shouldAddLeap = function(gpsMS, curGPSLeapMS, totalLeapsMS, isUnixToGPS) {
  if(isUnixToGPS) {
    // for unix->gps
    return gpsMS >= curGPSLeapMS - totalLeapsMS;
  } else {
    // for gps->unix
    return gpsMS >= curGPSLeapMS;
  }
};


/**
 * Counts the leaps from the GPS epoch to the inputted GPS time.
 * @param {number} gpsMS GPS time in milliseconds.
 * @param {boolean} isUnixToGPS
 * @return {number}
 */
var countLeaps = function(gpsMS, isUnixToGPS) {
  var numLeaps = 0;

  for(var i=0; i<gpsLeapMS.length; i++) {
    if(shouldAddLeap(gpsMS, gpsLeapMS[i], i * msInSecond, isUnixToGPS)) {
      numLeaps++;
    }
  }

  return numLeaps;
};


/**
 * Determines whether the GPS in milliseconds is a leap second.
 * @param {number} gpsMS
 * @return {boolean}
 */
var isLeap = function(gpsMS) {
  return gpsLeapMS.indexOf(gpsMS) !== -1;
};


/**
 * Converts GPS milliseconds to Unix milliseconds.
 * @param {number} gpsMS GPS milliseconds (1980 epoch).
 * @return {number} Unix milliseconds (1970 epoch).
 */
exports.toUnixMS = function(gpsMS) {
  // Epoch diff adjustment.
  var unixMS = gpsMS + gpsUnixEpochDiffMS;

  // Account for leap seconds between 1980 epoch and gpsMS.
  unixMS -= (countLeaps(gpsMS) * msInSecond);

  // If the passed in time falls exactly on a leap second, add a half second to distinguish it as a leap second.
  if(isLeap(gpsMS)) {
    unixMS += msInSecond / 2;
  }

  return unixMS;
};


/**
 * Converts Unix milliseconds to GPS milliseconds.
 * @param {number} unixMS Unix milliseconds (1970 epoch).
 * @return {number} GPS milliseconds (1980 epoch).
 */
exports.toGPSMS = function(unixMS) {
  // Fractional seconds indicate this is a leap second, which needs special handling.
  var isLeap = (unixMS % msInSecond) !== 0;
  if(isLeap) {
    unixMS -= msInSecond / 2;
  }

  // Epoch diff adjustment.
  var gpsMS = unixMS - gpsUnixEpochDiffMS;

  // Account for leap seconds between 1980 epoch and gpsMS.
  gpsMS += (countLeaps(gpsMS, true) * msInSecond);

  // If the passed in time falls exactly on a leap second, we have to tweak it.
  if(isLeap) {
    gpsMS += msInSecond;
  }

  return gpsMS;
};


return exports;

}));

'use strict';

var log = require('./lib/utils').log;
var env = process.env.NODE_ENV;
var pinger = require('./lib/pinger');
var Frontend = require('./lib/frontend');

if (env === 'production') {
} else {
  // load env in dev
  var dotenv = require('dotenv'); // only needed in dev
  dotenv.load();
}

var worker = pinger({ 
  interval: process.env.INTERVAL
});

var frontend = new Frontend({port: process.env.PORT});

// worker and frontend run side-by-side
worker.start();
frontend.start();
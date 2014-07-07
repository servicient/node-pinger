'use strict';

var log = require('./lib/utils').log;
var env = process.env.NODE_ENV;
var sites = require('./lib/sites');
var pinger = require('./lib/pinger');
var Frontend = require('./lib/frontend');

if (env === 'production') {
} else {
  // load env in dev
  var dotenv = require('dotenv'); // only needed in dev
  dotenv.load();
}

sites({db: process.env.DB}).all(run);

function run(sites) {
  var worker = pinger(sites,
    { 
      interval: process.env.INTERVAL
    });
  var frontend = new Frontend(sites,
    {
      port: process.env.PORT
    });

  // worker and frontend run side-by-side
  worker.start();
  frontend.start();
}
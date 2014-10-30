'use strict';

var http = require('http');
var log = require('./utils').log;
var EmailNotifier = require('./email_notifier');
var scheduler = require('./scheduler');

module.exports = pinger;

function pinger(sites, options) {
  var interval = options.interval;
  var emailNotifier = new EmailNotifier({
    apiKey: process.env.MANDRILL_API_KEY,
    replyTo: process.env.REPLY_TO
  });
  
  // public API
  return {
    start: start,

    stop: stop,

    ping: ping
  };

  function start() {
    scheduler(run, interval);
  }

  function run() {
    for (var i = 0; i < sites.length; i++) {
      ping(sites[i]);
    }
  }

  function ping(site) {
    if (site.active === '1') {
      log('PING: ' + site.url);
      var req = http.get(site.url);
      req.on('response', function(res) { getHandler(site, res); });
      req.on('error', function(err) { errorHandler(site, err); } );
      req.end();
    } else {
      log('Skipping ' + site.url);
    }
  }

  function getHandler(site, res) {
    res.resume(); /* do something with res to prevent socket close */
    
    log('STATUS: ' + site.url + ': ' + res.statusCode);
    if (res.statusCode !== 200) {
      if (!site.error) startErrorTracking(site);
    } else {
      log('SUCCESS: ' + site.url);
      if (site.error) stopErrorTracking(site);
    }
  }

  function errorHandler(site, err) {
    log('ERROR: ' + site.url + ': ' + err.message);
    if (!site.error) startErrorTracking(site);
  }

  function startErrorTracking(site) {
    if (!site.error) {
      openErrorAlert(site);
      emailNotifier.send({
        requestType: 'HTTP GET failure', 
        target: site.url, 
        contactEmail: site.contactEmail,
        contactName: site.contactName
      });
    }  
  }

  function stopErrorTracking(site) {
    if (site.error) {
      closeErrorAlert(site);
      emailNotifier.send({
        requestType: 'HTTP GET success', 
        target: site.url, 
        contactEmail: site.contactEmail,
        contactName: site.contactName
      });
    }  
  }

  function openErrorAlert(site) {
    log('Opening alert for: ' + site.url);
    site.update({error: true});
  }

  function closeErrorAlert(site) {
    log('Closing alert for: ' + site.url);
    site.update({error: false});
  }

  function stop() {
    // TODO
  }

}
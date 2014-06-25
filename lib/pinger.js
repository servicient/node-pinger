'use strict';

var http = require('http');
var log = require('./utils').log;
var EmailNotifier = require('./email_notifier');

module.exports = pinger;

function pinger(options) {
  var site = require('./site')({db: process.env.DB});
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
    setInterval(function() {
        site.all(run);
      }, 
      interval
    );
  }

  function run(sites) {
    for (var i = 0; i < sites.length; i++) {
      ping(sites[i]);
    }
  }

  function ping(site) {
    if (site.active === '1') {
      log('PING: ' + site.url);
      var req = http.get(site.url);
      req.on('response', function(res) { httpGetHandler(site, res); });
      req.on('error', function(err) { errorHandler(site, err); } );
      req.end();
    } else {
      log('Skipping ' + site.url);
    }
  }

  function httpGetHandler(site, res) {
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
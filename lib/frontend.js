'use strict';

var Site = require('./site'),
  flatiron = require('flatiron'),
  app = flatiron.app;

module.exports = Frontend;

function Frontend(config) {
  this.port = config.port;

  app.use(flatiron.plugins.http, {
    // HTTP options
  });

  app.router.get('/', function() { this.res.redirect('/sites'); });
  app.router.get('/sites', function() {
    var self = this;
    Site.all(function(sites) { renderSites(self.res, sites); });
  });
}

Frontend.prototype.start = function() {
  app.start(this.port);
};

function renderSites(res, sites) {
  res.json(sites);
}
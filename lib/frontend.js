'use strict';

var flatiron = require('flatiron'),
  app = flatiron.app;

module.exports = Frontend;


function Frontend(sites, config) {

  if (!(this instanceof Frontend)) return new Frontend(sites, config);
  
  this.port = config.port;

  app.use(flatiron.plugins.http, {
    // HTTP options
  });

  app.router.get('/', function() { this.res.redirect('/sites'); });
  app.router.get('/sites', function() {
    this.res.json(sites);
  });
}

Frontend.prototype.start = function() {
  app.start(this.port);
};

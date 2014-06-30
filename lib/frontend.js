'use strict';

var site = require('./site')({db: process.env.DB}),
  flatiron = require('flatiron'),
  app = flatiron.app;

module.exports = Frontend;

app.use(flatiron.plugins.http, {
  // HTTP options
});

app.router.get('/', function() { this.res.redirect('/sites'); });
app.router.get('/sites', function() {
  var self = this;
  site.all(respondWithSites);

  function respondWithSites(sites) { 
    self.res.json(sites); 
  }
});

function Frontend(config) {
  this.port = config.port;
}

Frontend.prototype.start = function() {
  app.start(this.port);
};

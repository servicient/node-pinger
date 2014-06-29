'use strict';

var MongoClient = require('mongodb').MongoClient;
var config;

module.exports = function(_config) {

  config = _config;
  
  return {
    all: all,

    Site: Site
  };
};

function all(callback) {
  MongoClient.connect(config.db, getSites);

  function getSites(err, db) {
    if (err) throw err;

    db.collection('sites').find().toArray(cleanup);

    function cleanup(err, results) {
      if (err) throw err;
      
      var convert, sites;
      
      convert = function(result) {
        return (new Site(result));
      };
      
      sites = results.map(convert);
      
      db.close();
      
      callback(sites);
    }
  }
}

function Site(obj) {
  this.updateAttributes(obj);
}

Site.prototype.updateAttributes = function(obj) {
  this._id = obj._id;
  this.name = obj.name;
  this.url = obj.url;
  this.active = obj.active;
  this.contactEmail = obj.contactEmail;
  this.contactName = obj.contactName;
  this.error = obj.error;
  this.errorTime = obj.errorTime;
};

Site.prototype.update = function(changes) {
  var self = this;

  MongoClient.connect(config.db, findAndModify);

  function findAndModify(err, db) {
    if (err) throw err;

    var modification = changes.error ?
      {$set: {error: true, errorTime: (new Date())}} :
      {$unset: {error: '', errorTime: ''}};

    db.collection('sites').findAndModify(
      {_id: self._id}, 
      null, 
      modification,
      {new: true},
      updateSite
    );

    function updateSite(err, doc) {
      if (err) throw err;

      self.updateAttributes(doc);
      db.close();
    }
  }
};

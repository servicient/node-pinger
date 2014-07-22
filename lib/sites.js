'use strict';

var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');
var config;

module.exports = function(_config) {

  config = _config;
  
  return {
    all: all,

    Site: Site
  };
};

function all () {
  var promise = new Promise(connect);

  function connect (resolve, reject) {
    MongoClient.connect(config.db, find);

    function find (err, db) {
      if (err) reject(err);

      db.collection('sites').find().toArray(collect);

      function collect (err, results) {
        if (err) reject(err);
        
        var convert, sites;
        
        convert = function(result) {
          return (new Site(result));
        };
        
        sites = results.map(convert);
        
        db.close();
        
        resolve(sites);
      }
    }
  }

  return promise;
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
  var promise = new Promise(connect);
  var self = this;

  function connect (resolve, reject) {

    MongoClient.connect(config.db, findAndModify);

    function findAndModify(err, db) {
      if (err) reject(err);

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
        if (err) reject(err);

        self.updateAttributes(doc);
        
        db.close();

        resolve(doc);
      }
    }
  }

  return promise;
};

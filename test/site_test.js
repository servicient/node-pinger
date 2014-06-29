'use strict';

var expect = require('chai').expect;
var site = require('../lib/site')();

describe('Site', function() {
  describe('contructor', function() {
    it('creates an instance', function() {
      var mySite = new site.Site({});
      expect(mySite).to.be.instanceof(site.Site);
    });
  });

  describe('updateAttributes', function() {
    it('sets object properties', function() {
      var mySite = new site.Site({name: 'Name', url: 'URL'});
      expect(mySite.name).to.eq('Name');
    });
  });

  describe('behavior', function() {
    it('can update an object', function() {
      var mySite = new site.Site({});
      expect(mySite).to.respondTo('update');
    });
  });
});
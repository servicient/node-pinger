'use strict';

var expect = require('chai').expect;
var sites = require('../lib/sites')();

describe('Sites', function() {
  describe('contructor', function() {
    it('creates an instance', function() {
      var mySite = new sites.Site({});
      expect(mySite).to.be.instanceof(sites.Site);
    });
  });

  describe('updateAttributes', function() {
    it('sets object properties', function() {
      var mySite = new sites.Site({name: 'Name', url: 'URL'});
      expect(mySite.name).to.eq('Name');
    });
  });

  describe('behavior', function() {
    it('can update an object', function() {
      var mySite = new sites.Site({});
      expect(mySite).to.respondTo('update');
    });
  });
});
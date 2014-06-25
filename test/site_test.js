'use strict';

var expect = require('chai').expect;
var site = require('../lib/site')();

describe('Site', function() {
  describe('contructor', function() {
    it('returns an object', function() {
      var mySite = new site.Site({});
      expect(mySite).to.be.an('object');
    });
  });

  describe('updateAttributes', function() {
    it('sets object properties', function() {
      var mySite = new site.Site({name: 'Name', url: 'URL'});
      expect(mySite.name).to.eq('Name');
    });
  });
});
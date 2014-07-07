'use strict';

var expect = require('chai').expect;
var Frontend = require('../lib/frontend');

describe('Frontend', function() {
  describe('contructor', function() {
    it('creates an instance', function() {
      var frontend = new Frontend([], {});
      expect(frontend).to.be.instanceof(Frontend);
    });
  });
});
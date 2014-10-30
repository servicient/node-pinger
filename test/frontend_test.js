'use strict';

var expect = require('chai').expect;
var Frontend = require('../lib/frontend');

describe('Frontend', function() {
  describe('contructor', function() {
    it('invoked with new', function() {
      var frontend = new Frontend([], {});
      expect(frontend).to.be.instanceof(Frontend);
    });
    it('invoked without new', function() {
      var frontend = Frontend([], {});
      expect(frontend).to.be.instanceof(Frontend);
    });
  });
});
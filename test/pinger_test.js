'use strict';

var expect = require('chai').expect;
var pinger = require('../lib/pinger');

describe('pinger', function() {
  describe('api', function() {
    expect(pinger([], {interval: 3})).to.respondTo('start');
  });
});
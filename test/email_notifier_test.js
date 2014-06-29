'use strict';

var expect = require('chai').expect;
var EmailNotifier = require('../lib/email_notifier');

describe('EmailNotifier', function() {
  describe('contructor', function() {
    it('creates an instance', function() {
      var emailNotifier = new EmailNotifier({});
      expect(emailNotifier).to.be.instanceof(EmailNotifier);
    });

    it('sets object properties', function() {
      var emailNotifier = new EmailNotifier({apiKey: 'key', replyTo: 'me'});
      expect(emailNotifier.apiKey).to.eq('key');
    });
  });

  describe('behavior', function() {
    it('can send messages', function() {
      var emailNotifier = new EmailNotifier({});
      expect(emailNotifier).to.respondTo('send');
    });
    it('can create a message', function() {
      var emailNotifier = new EmailNotifier({});
      expect(emailNotifier).to.respondTo('createMessage');
    });
  });
});
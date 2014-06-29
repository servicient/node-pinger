'use strict';

var request = require('request-json');
var log = require('./utils').log;

module.exports = EmailNotifier;

function EmailNotifier(config) {
  this.apiKey = config.apiKey;
  this.host = 'https://mandrillapp.com/';
  this.env = process.env.NODE_ENV;
  this.replyTo = config.replyTo;
}

EmailNotifier.prototype = {

  send: function send(details) {
    var options = { 
      target: details.target, 
      requestType: details.requestType,
      contactEmail: details.contactEmail,
      contactName: details.contactName
    };
    
    var client = request.newClient(this.host);

    client.post('api/1.0/messages/send.json', 
      this.createMessage(options), 
      apiRes
    );

    function apiRes(err, res, body) {
      if (err) log(err);
      log('Email api response: ' + res.statusCode);
    }
  },

  createMessage: function createMessage(options) {
    return {
      "key": this.apiKey,
      "message": {
        "subject": options.requestType + " notice for resource " + options.target,
        "html": "<p>Alert: " + options.requestType + "</p>",
        "from_email": this.replyTo,
        "from_name": "Node Pinger",
        "to": [
          {
            "email": options.contactEmail,
            "name": options.contactName,
            "type": "to"
          }
        ],
        "headers": {
          "Reply-To": this.replyTo
        }
      },
      "async": false
    };
  }
};

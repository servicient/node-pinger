'use strict';

module.exports = scheduler;

function scheduler(callback, interval) {

  setInterval(callback, interval);

}
// var ping = require('net-ping');

// function pingIt(target) {
//   var session = ping.createSession();

//   session.pingHost(target, function pingRes(error, target) {
//     if (error) {
//       if (error instanceof ping.RequestTimedOutError)
//         log(target + ": Not alive");
//       else
//         log(target + ": " + error.toString());
//       sendEmailNotification({requestType: 'ping', target: target});
//     } else {
//       log(target + ": Alive");
//     }
//   });
// }

var sessionKey = require('./get-url/session-key.js'),
    $ = require('jquery');

module.exports = function(command, arg, arg2) {
  var URL = 'https://genericwitticism.com:8000/api3/?';
  var params = {
    session: sessionKey,
    command: command,
    arg: arg,
    arg2: arg2
  };
  return URL + $.param(params);
}

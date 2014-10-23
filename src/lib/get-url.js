var sessionKey = require('./get-url/session-key.js'),
    $ = require('jquery');

module.exports = function(command) {
  var URL = 'https://genericwitticism.com:8000/api3/?';
  var params = {
    session: sessionKey,
    command: command
  };
  return URL + $.param(params);
}

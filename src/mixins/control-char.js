/** @jsx React.DOM */

var Mousetrap = require('mousetrap');

module.exports = {
  componentWillMount: function() {
    Mousetrap.bind('left', function(e) {
      console.log('go left')
    });
  },
}

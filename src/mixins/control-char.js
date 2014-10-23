/** @jsx React.DOM */

var Mousetrap = require('mousetrap'),
    getUrl = require('../lib/get-url.js'),
    $ = require('jquery');

module.exports = {
  componentWillMount: function() {
    Mousetrap.bind('left', function(e) {
      if (this.state.currentChar) {
        $.get(getUrl('move', this.state.currentChar, 'left'), function(response) {
          console.log(response);
        });
      }
    }.bind(this));
  },
}

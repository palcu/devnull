/** @jsx React.DOM */

var Mousetrap = require('mousetrap'),
    getUrl = require('../lib/get-url.js'),
    $ = require('jquery');

// TODO @palcu: take the response and pass it somehow to level component
// TODO @palcu: DRY this fucking code

module.exports = {
  componentWillMount: function() {
    Mousetrap.bind('up', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'up'), function(response) {
        console.log(response['success']);
      });
    }.bind(this));
    Mousetrap.bind('down', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'down'), function(response) {
        console.log(response['success']);
      });
    }.bind(this));
    Mousetrap.bind('left', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'left'), function(response) {
        console.log(response['success']);
      });
    }.bind(this));
    Mousetrap.bind('right', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'right'), function(response) {
        console.log(response['success']);
      });
    }.bind(this));

  }
};

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
      $.get(getUrl('move', this.state.currentChar, 'left'), this._parseResponse);
    }.bind(this));
    Mousetrap.bind('down', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'right'), this._parseResponse);
    }.bind(this));
    Mousetrap.bind('left', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'up'), this._parseResponse);
    }.bind(this));
    Mousetrap.bind('right', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'down'), this._parseResponse);
    }.bind(this));
  },

  _parseResponse: function(response) {
    if ($.type(response.success) === 'object') {
      var coords = response.success.movedto;
      console.log('moved to (' + coords.x + ', ' + coords.y + ')');
    } else {
      console.log(response.success);
    }
  }
};

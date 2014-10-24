var Mousetrap = require('mousetrap'),
    getUrl = require('../lib/get-url.js'),
    $ = require('jquery');

// TODO @palcu: take the response and pass it somehow to level component
// TODO @palcu: DRY this fucking code

module.exports = {
  componentWillMount: function() {
    Mousetrap.bind('up', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'left'), this._parseMoveResponse);
    }.bind(this));
    Mousetrap.bind('down', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'right'), this._parseMoveResponse);
    }.bind(this));
    Mousetrap.bind('left', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'up'), this._parseMoveResponse);
    }.bind(this));
    Mousetrap.bind('right', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'down'), this._parseMoveResponse);
    }.bind(this));

    Mousetrap.bind('i', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'upleft'), this._parseMoveResponse);
    }.bind(this));
    Mousetrap.bind('o', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'downleft'), this._parseMoveResponse);
    }.bind(this));
    Mousetrap.bind('k', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'upright'), this._parseMoveResponse);
    }.bind(this));
    Mousetrap.bind('l', function(e) {
      e.preventDefault();
      $.get(getUrl('move', this.state.currentChar, 'downright'), this._parseMoveResponse);
    }.bind(this));

    Mousetrap.bind('g', function(e) {
      e.preventDefault();
      $.get(getUrl('get', this.state.currentChar), function(resp) {
        console.log(resp);
      })
    }.bind(this));
    Mousetrap.bind('u', function(e) {
      e.preventDefault();
      $.get(getUrl('levelup', this.state.currentChar), function(resp) {
        console.log(resp);
      })
    }.bind(this));
    Mousetrap.bind('d', function(e) {
      e.preventDefault();
      $.get(getUrl('leveldown', this.state.currentChar), function(resp) {
        console.log(resp);
      })
    }.bind(this));
  },

  _parseMoveResponse: function(response) {
    if ($.type(response.success) === 'object' && 'movedto' in response.success) {
      var coords = response.success.movedto;
      console.log('moved to (' + coords.x + ', ' + coords.y + ')');
    } else {
      console.log(JSON.stringify(response.success));
    }
  }
};

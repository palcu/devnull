var Mousetrap = require('mousetrap'),
    getUrl = require('../lib/get-url.js'),
    $ = require('jquery'),
    log = require('log-with-style');


// TODO @palcu: DRY this fucking code

/**
 * Bind these keyboard shortcuts using mousetrap to different actions. Also,
 * I've added here the logic for showing when a monster is dead in battle.
 */
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

    Mousetrap.bind('w', function(e) {
      e.preventDefault();
      $.get(getUrl('dig', 'left', this.state.currentChar), this._parseMoveResponse);
    }.bind(this));
    Mousetrap.bind('a', function(e) {
      e.preventDefault();
      $.get(getUrl('dig', 'up', this.state.currentChar), this._parseMoveResponse);
    }.bind(this));
    Mousetrap.bind('s', function(e) {
      e.preventDefault();
      $.get(getUrl('dig', 'right', this.state.currentChar), this._parseMoveResponse);
    }.bind(this));
    Mousetrap.bind('d', function(e) {
      e.preventDefault();
      $.get(getUrl('dig', 'down', this.state.currentChar), this._parseMoveResponse);
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
    Mousetrap.bind('z', function(e) {
      e.preventDefault();
      $.get(getUrl('levelup', this.state.currentChar), function(resp) {
        console.log(resp);
      })
    }.bind(this));
    Mousetrap.bind('x', function(e) {
      e.preventDefault();
      $.get(getUrl('leveldown', this.state.currentChar), function(resp) {
        console.log(resp);
      })
    }.bind(this));

    Mousetrap.bind('p', function(e) {
      e.preventDefault();
      $.get(getUrl('planeshift', this.state.currentChar, 'sorting_puzzle_dimension'), function(resp) {
        console.log(resp);
      })
    }.bind(this));
  },

  _parseMoveResponse: function(response) {
    if ($.type(response.success) === 'object' && 'movedto' in response.success) {
      var coords = response.success.movedto;
      console.log('moved to (' + coords.x + ', ' + coords.y + ')');
    } else {
      var msg = JSON.stringify(response.success);
      if (msg && msg.indexOf('HP 0') > -1) {
        var re = /\[(.*?)\]/g;
        var info = [];
        while (text = re.exec(msg)) {
          info.push(text)
        }
        log('[c="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #fff; font-size: 20px; padding: 15px 20px; background: #444; border-radius: 4px; line-height: 100px; text-shadow: 0 1px #000"]Dead[c]');
      }
      console.log(msg);
    }
  }
};

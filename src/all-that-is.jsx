/** @jsx React.DOM */
/* global document, window */


var React = require('react'),
    Game = require('./game.jsx'),
    $ = require('jquery'),
    ControlCharMixin = require('./mixins/control-char.js'),
    log = require('log-with-style'),
    getUrl = require('./lib/get-url.js');


/**
 * I wanted `game` to be the highest component in the design. But, then I wanted to
 * send the current character from localStorage, it was simpler to make a `god`
 * component above `game`.
 */
var AllThatIs = React.createClass({
  mixins: [ControlCharMixin],

  getInitialState: function() {
    var currentChar = window.localStorage.getItem('currentChar') || '';
    return {currentChar: currentChar};
  },

  render: function() {
    return <Game onCharacterSelect={this.onCharacterSelect}
                 currentChar={this.state.currentChar} />;
  },

  onCharacterSelect: function(character) {
    this.setState({currentChar: character});
    window.localStorage.setItem('currentChar', character);
  },
});

// Because you never know
window.React = React;
window.$ = $;
window.log = log;
window.getHighScores = function() {
  $.get(getUrl('gethighscores'), function(response) {
    var top = [];
    response.success.forEach(function(score) {
      top.push({name: score.name, score: score.score});
    });
    console.table(top);
  });
};

React.renderComponent(
  <AllThatIs />,
  document.getElementById('container')
);

/** @jsx React.DOM */
/* global document, window */


var React = require('react'),
    Game = require('./game.jsx'),
    $ = require('jquery'),
    ControlCharMixin = require('./mixins/control-char.js');

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

React.renderComponent(
  <AllThatIs />,
  document.getElementById('container')
);

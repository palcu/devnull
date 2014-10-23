/** @jsx React.DOM */
/* global document */


var React = require('react'),
    Party = require('./components/party.jsx'),
    CharTemplate = require('./components/chartemplate.jsx'),
    CreateCharacter = require('./components/create-char.jsx'),
    CurrentCharacter = require('./components/current-char.jsx'),
    Level = require('./components/level.jsx'),
    ControlCharMixin = require('./mixins/control-char.js');

var Game = React.createClass({
  mixins: [ControlCharMixin],

  getInitialState: function() {
    return {currentChar: ""};
  },

  render: function() {
    return <div className="flex-container">
      <div className="flex-item">
        <CreateCharacter />
        <CharTemplate />
      </div>
      <div className="flex-item">
        <Party onCallback={this.onCharacterSelect} />
        <CurrentCharacter currentChar={this.state.currentChar} />
      </div>
      <div className="flex-map">
        <Level currentChar={this.state.currentChar} />
      </div>
    </div>;
  },

  onCharacterSelect: function(character) {
    this.setState({currentChar: character});
  }
});


// For the toolbar
window.React = React;

React.renderComponent(
  <Game />,
  document.getElementById('container')
);

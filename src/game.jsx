/** @jsx React.DOM */
/* global document */


var React = require('react'),
    Party = require('./components/party.jsx'),
    CharTemplate = require('./components/chartemplate.jsx'),
    CreateCharacter = require('./components/create-char.jsx'),
    CurrentCharacter = require('./components/current-char.jsx'),
    Level = require('./components/level.jsx');

var Game = React.createClass({
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
      <div className="flex-item">
        <Level currentChar={this.state.currentChar} />
      </div>
    </div>;
  },

  onCharacterSelect: function(character) {
    this.setState({currentChar: character});
  }
});

React.renderComponent(
  <Game />,
  document.getElementById('container')
);

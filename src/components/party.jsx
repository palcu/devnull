/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js'),
    Character = require('./character.jsx'),
    Constants = require('../constants.js');

var Party = React.createClass({
  getInitialState: function() {
    return {party: []};
  },

  render: function() {
    return <div>
      <h1>Party</h1>
      <ul>
        {this.state.party.map(function(character, index) {
          return <Character name={character}
                     key={index}
                     onCharacterSelect={this.onCharacterSelect}
                     onCharacterDelete={this.onCharacterDelete} />;
        }.bind(this))}
      </ul>
    </div>;
  },

  componentDidMount: function() {
    setInterval(this._getParty, Constants.PARTY_INTERVAL);
  },

  componentWillReceiveProps: function() {
    this._getParty();
  },

  onCharacterSelect: function(character) {
    this.props.onCallback(character);
  },

  onCharacterDelete: function(character) {
    $.get(getUrl('deletecharacter', character), function(response){
      console.log(response);
    }.bind(this));
  },

  _getParty: function() {
    $.get(getUrl('getparty'), function(response){
      this.setState({party: response.characters});
    }.bind(this));
  }
});

module.exports = Party;

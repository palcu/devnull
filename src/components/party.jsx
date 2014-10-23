/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js');

var Party = React.createClass({
  getInitialState: function() {
    return {party: []};
  },

  render: function() {

    return <div>
      <p>Party</p>
      <ul>
        {this.state.party.map(function(character, index) {
          return <li key={index} ref={character} onClick={this.onCharacterClick}>
            {character}
          </li>;
        }.bind(this))}
      </ul>
    </div>;
  },

  componentDidMount: function() {
    $.get(getUrl('getparty'), function(response){
      this.setState({party: response.characters});
    }.bind(this));
  },

  onCharacterClick: function(event) {
    this.props.onCallback(event.target.textContent);
  }
});

module.exports = Party;

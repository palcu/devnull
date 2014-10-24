/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js'),
    jsonMarkup = require('json-markup'),
    Constants = require('../constants.js'),
    Inventory = require('./inventory.jsx');

var CurrentChar = React.createClass({
  getInitialState: function() {
    return {
      currentChar: {},
      inventory: []
    };
  },

  render: function() {
    var rawMarkup = jsonMarkup(this.state.currentChar);
    return <div>
      <h1>Current Character</h1>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      <Inventory items={this.state.inventory}
                 onDrop={this.onDrop}
                 onUse={this.onUse} />
    </div>;
  },

  componentDidMount: function() {
    setInterval(this._getChar, Constants.CURRENT_CHAR_INTERVAL);
  },

  onDrop: function(id) {
    $.get(getUrl('drop', id, this.state.currentChar.id), function(response) {
      console.log(response);
    });
  },

  onUse: function(method, id) {
    $.get(getUrl(method, id, this.state.currentChar.id), function(response) {
      console.log(response);
    });
  },

  _getChar: function() {
    if (this.props.currentChar) {
      $.get(getUrl('getcharacter', this.props.currentChar), function(response){
        var toDisplay = {};
        ['id', 'exp', 'level', 'str', 'int', 'wis', 'dex', 'con', 'x', 'y',
         'hp', 'ac', 'alloc', 'speed'].forEach(function(key) {
          toDisplay[key] = response[key]
         });
         toDisplay['weapon'] = response['wieldedweaponname']
         toDisplay['armor'] = response['equippedarmorname']

        this.setState({
          currentChar: toDisplay,
          inventory: response.inventory
        });
      }.bind(this));
    }
  }
});

module.exports = CurrentChar;

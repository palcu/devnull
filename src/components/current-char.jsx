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
      <Inventory items={this.state.inventory}
                 onDrop={this.onDrop}
                 onRepair={this.onRepair}
                 onUse={this.onUse}
                 onUnwieldArmor={this.onUnwieldArmor}
                 onUnwieldWeapon={this.onUnwieldWeapon} />
      <h1>Current Character</h1>
      {this.state.canUpgrade ? <p className="warning">Upgrade character</p> : ''}
      <p className="info">HP {this.state.currentHP}</p>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
    </div>
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

  onUnwieldArmor: function(event) {
    event.preventDefault();
    $.get(getUrl('unequip', this.state.currentArmor, this.state.currentChar.id),
          function(response) {
            console.log(response);
          })
  },

  onUnwieldWeapon: function(event) {
    event.preventDefault();
    $.get(getUrl('unwield', this.state.currentWeapon, this.state.currentChar.id),
          function(response) {
            console.log(response);
          })
  },

  onRepair: function(id) {
    $.get(getUrl('repair', id, this.state.currentChar.id), function(response) {
      console.log(response);
    });
  },

  _getChar: function() {
    if (this.props.currentChar) {
      $.get(getUrl('getcharacter', this.props.currentChar), function(response){
        var toDisplay = {};
        ['id', 'exp', 'level', 'str', 'int', 'wis', 'dex', 'con', 'x', 'y',
         'ac', 'speed'].forEach(function(key) {
          toDisplay[key] = response[key]
         });
         toDisplay['weapon'] = response['wieldedweaponname']
         toDisplay['armor'] = response['equippedarmorname']

        this.setState({
          currentWeapon: response.wieldedweapon,
          currentArmor: response.equippedarmor,
          canUpgrade: response.alloc > 0,
          currentHP: response.hp,
          currentChar: toDisplay,
          inventory: response.inventory
        });
      }.bind(this));
    }
  }
});

module.exports = CurrentChar;

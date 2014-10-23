/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js');

var CreateCharacter = React.createClass({
  getInitialState: function() {
    return {
      name: "alex",
      str: 10,
      con: 10,
      dex: 10,
      int: 10,
      wis: 10
    };
  },

  render: function() {
    return <form onSubmit={this.handleSubmit}>
      <p>Create Character</p>
      <div className="form-section">
        <label>Name</label>
        <input type="text" value={this.state.name} onChange={this.onNameChange} />
      </div>
      <div className="form-section">
        <label>Str</label>
        <input type="text" value={this.state.str} onChange={this.onStrChange} />
      </div>
      <div className="form-section">
        <label>Con</label>
        <input type="text" value={this.state.con} onChange={this.onConChange} />
      </div>
      <div className="form-section">
        <label>Dexterity</label>
        <input type="text" value={this.state.dex} onChange={this.onDexChange} />
      </div>
      <div className="form-section">
        <label>Intelligence</label>
        <input type="text" value={this.state.int} onChange={this.onIntChange} />
      </div>
      <div className="form-section">
        <label>Wisdom</label>
        <input type="text" value={this.state.wis} onChange={this.onWisChange} />
      </div>
      <button onClick={this.onSubmit}>Create</button>
    </form>;
  },

  handleSubmit: function(event) {
    event.preventDefault();
  },

  onNameChange: function(event) {
    this.setState({name: event.target.value});
  },

  onStrChange: function(event) {
    this.setState({str: parseInt(event.target.value)});
  },

  onConChange: function(event) {
    this.setState({con: parseInt(event.target.value)});
  },

  onDexChange: function(event) {
    this.setState({dex: parseInt(event.target.value)});
  },

  onIntChange: function(event) {
    this.setState({int: parseInt(event.target.value)});
  },

  onWisChange: function(event) {
    this.setState({wis: parseInt(event.target.value)});
  },

  onSubmit: function(event) {
    event.preventDefault();
    var args = this._getSerialisation();
    $.get(getUrl('createcharacter', args), function(response) {
      console.log(response);
    }.bind(this));
  },

  _getSerialisation: function() {
    var args = [],
        qualities = ['name', 'str', 'con', 'dex', 'int', 'wis'];
    for (var i in qualities) {
      var quality = qualities[i];
      args.push(quality + ':' + this.state[quality]);
    }
    return args.join(',');
  }
});

module.exports = CreateCharacter;

/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js');

var CreateCharacter = React.createClass({
  getInitialState: function() {
    return {
      name: "palcu",
      str: 14,
      con: 10,
      dex: 10,
      int: 14,
      wis: 10
    };
  },

  render: function() {
    return <form onSubmit={this.handleSubmit}>
      <h1>Create Character</h1>
      <div className="form-section">
        <label>Name</label>
        <input type="text" value={this.state.name} onChange={this.onNameChange} />
      </div>
      <div className="form-section">
        <label onClick={this.onLevelUp}>str</label>
        <input type="text" value={this.state.str} onChange={this.onStrChange} />
      </div>
      <div className="form-section">
        <label onClick={this.onLevelUp}>con</label>
        <input type="text" value={this.state.con} onChange={this.onConChange} />
      </div>
      <div className="form-section">
        <label onClick={this.onLevelUp}>dex</label>
        <input type="text" value={this.state.dex} onChange={this.onDexChange} />
      </div>
      <div className="form-section">
        <label onClick={this.onLevelUp}>int</label>
        <input type="text" value={this.state.int} onChange={this.onIntChange} />
      </div>
      <div className="form-section">
        <label onClick={this.onLevelUp}>wis</label>
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

  onLevelUp: function(event) {
    var quality = event.target.textContent;
    $.get(getUrl('allocatepoints', quality, this.props.characterId), function(response) {
      console.log(response);
    });
  },

  onSubmit: function(event) {
    event.preventDefault();
    var args = this._getSerialisation();
    $.get(getUrl('createcharacter', args), function(response) {
      console.log(response);
    });
  },

  _getSerialisation: function() {
    var args = [],
        qualities = ['name', 'str', 'con', 'dex', 'int', 'wis'];

    qualities.forEach(function (quality) {
      args.push(quality + ':' + this.state[quality]);
    }.bind(this));

    return args.join(',');
  }
});

module.exports = CreateCharacter;

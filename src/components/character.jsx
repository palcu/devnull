/** @jsx React.DOM */

var React = require('react');


/**
 * Show a character with it's select and delete links.
 */
var Character = React.createClass({
  render: function() {
    return <li onClick={this.onCharacterClick}>
      <a href="#" onClick={this.onCharacterSelect}>{this.props.name}</a> - <a href="#" onClick={this.onCharacterDelete}>[x]</a>
    </li>;
  },

  onCharacterSelect: function() {
    this.props.onCharacterSelect(this.props.name);
  },

  onCharacterDelete: function() {
    this.props.onCharacterDelete(this.props.name);
  }
});

module.exports = Character;

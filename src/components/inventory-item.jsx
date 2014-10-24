/** @jsx React.DOM */

var React = require('react'),
    getUrl = require('../lib/get-url.js'),
    localStorage = require('../lib/local-storage.js'),
    $ = require('jquery');

var InventoryItem = React.createClass({
  getInitialState: function() {
    var attributes = localStorage.getLocalStorageKey('inventory', this.props.id) || {};
    return {attributes: attributes};
  },

  componentDidMount: function() {
    if ($.isEmptyObject(this.state.attributes)) {
      $.get(getUrl('getinfofor', this.props.id), function(response) {
        this.setState({attributes: response});
        window.localStorage.setItem('inventory' + ':' + this.props.id,
                                    JSON.stringify(response));
      }.bind(this))
    }
  },

  render: function() {
    if ($.isEmptyObject(this.state.attributes)) {
      return <li>{this.props.id}</li>;
    }
    return <li>
      {this.state.attributes.name + '-'}<a onClick={this.onDrop} href="#">[Drop]</a>
      {'-'}<a onClick={this.onUse} href="#">[Use]</a>
    </li>;
  },

  onDrop: function(event) {
    event.preventDefault();
    this.props.onDrop(this.props.id);
  },

  onUse: function(event) {
    event.preventDefault;
    if (this.state.attributes.subtype === 'weapon') {
      this.props.onUse('wield', this.props.id);
    } else if (this.state.attributes.subtype === 'armor') {
      this.props.onUse('equip', this.props.id);
    } else if (this.state.attributes.subtype === 'potion') {
      this.props.onUse('quaff', this.props.id);
    }
  }
});

module.exports = InventoryItem;

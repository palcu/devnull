/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js'),
    jsonMarkup = require('json-markup');

var Party = React.createClass({
  getInitialState: function() {
    return {party: {}};
  },

  render: function() {
    var rawMarkup = jsonMarkup(this.state.party);
    return <div>
      <p>Party</p>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />;
    </div>;
  },

  componentDidMount: function() {
    $.get(getUrl('getparty'), function(response){
      this.setState({party: response});
    }.bind(this));
  }
});

module.exports = Party;

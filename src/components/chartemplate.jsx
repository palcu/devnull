/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js'),
    jsonMarkup = require('json-markup');


/**
 * This is a test component to display an API request.
 */
var CharTemplate = React.createClass({
  getInitialState: function() {
    return {charTemplate: {}};
  },

  render: function() {
    var rawMarkup = jsonMarkup(this.state.charTemplate);
    return <div>
      <p>Character template</p>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
    </div>;
  },

  componentDidMount: function() {
    $.get(getUrl('getchartemplate'), function(response){
      delete response.mid;
      this.setState({charTemplate: response});
    }.bind(this));
  }
});

module.exports = CharTemplate;

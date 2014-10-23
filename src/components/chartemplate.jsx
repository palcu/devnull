/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js');

var CharTemplate = React.createClass({
  render: function() {
    return <div>Create Class!</div>;
  },

  componentDidMount: function() {
    $.get(getUrl('getchartemplate'), function(response){
      console.log(response);
    });
  }
});

module.exports = CharTemplate;

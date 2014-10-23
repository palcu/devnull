/** @jsx React.DOM */
/* global document */


var React = require('react');

var Hello = React.createClass({
  render: function() {
    return <div>Hello, {this.props.name}!</div>;
  }
});

React.renderComponent(
  <Hello name="Game" />,
  document.getElementById('hello')
);

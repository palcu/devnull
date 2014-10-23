/** @jsx React.DOM */
/* global document */


var React = require('react'),
    CharTemplate = require('./components/chartemplate.jsx');

var Hello = React.createClass({
  render: function() {
    return <div>
      Hello, {this.props.name}!
      <CharTemplate />
    </div>;
  }
});

React.renderComponent(
  <Hello name="Game" />,
  document.getElementById('hello')
);

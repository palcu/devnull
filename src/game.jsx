/** @jsx React.DOM */
/* global document */


var React = require('react'),
    Party = require('./components/party.jsx'),
    CharTemplate = require('./components/chartemplate.jsx');

var Game = React.createClass({
  render: function() {
    return <div className="flex-container">
      <div className="flex-item"><CharTemplate /></div>
      <div className="flex-item"><Party /></div>
      <div className="flex-item"></div>
    </div>;
  }
});

React.renderComponent(
  <Game />,
  document.getElementById('container')
);

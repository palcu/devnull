/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js'),
    jsonMarkup = require('json-markup');

var Level = React.createClass({
  getInitialState: function() {
    return {currentChar: {}};
  },

  render: function() {
    var rawMarkup = jsonMarkup(this.state.currentChar);
    return <div>
      <p>Level</p>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />;
    </div>;
  },

  componentWillReceiveProps: function() {
    if (this.props.currentChar) {
      $.get(getUrl('scan', this.props.currentChar), function(response){
        delete response.mid;
        this.setState({currentChar: response});
      }.bind(this));
    }
  }
});

module.exports = Level;

/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js'),
    jsonMarkup = require('json-markup');

var CurrentChar = React.createClass({
  getInitialState: function() {
    return {currentChar: {}};
  },

  render: function() {
    var rawMarkup = jsonMarkup(this.state.currentChar);
    return <div>
      <p>Current Character</p>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />;
    </div>;
  },

  componentWillReceiveProps: function() {
    this._getChar();
  },

  componentDidMount: function() {
    setInterval(this._getChar, 1000);
  },

  _getChar: function() {
    if (this.props.currentChar) {
      $.get(getUrl('getcharacter', this.props.currentChar), function(response){
        delete response.mid;
        this.setState({currentChar: response});
      }.bind(this));
    }
  }
});

module.exports = CurrentChar;

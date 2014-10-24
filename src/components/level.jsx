/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js'),
    jsonMarkup = require('json-markup'),
    Constants = require('../constants.js');

var Level = React.createClass({
  getInitialState: function() {
    return {level: {}};
  },

  render: function() {
    var rawMarkup = jsonMarkup(this.state.level);
    return <div>
      <h1>Level</h1>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />;
    </div>;
  },

  componentDidMount: function() {
    setInterval(this._getLevel, Constants.SCAN_INTERVAL);
  },

  componentWillMount: function() {
    // this._getLevel();
  },

  _getLevel: function(currentChar) {
    currentChar = currentChar || this.props.currentChar;
    if (currentChar) {
      $.get(getUrl('scan', currentChar), function(response){
        delete response.mid;
        this.setState({level: response});
        this.props.onReceiveLevel(response);
      }.bind(this));
    }
  }
});

module.exports = Level;

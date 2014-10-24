/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    getUrl = require('../lib/get-url.js'),
    jsonMarkup = require('json-markup'),
    Constants = require('../constants.js'),
    _ = require('lodash');

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

        if (response.updates.length) {
          response.updates.forEach(function(update) {
            console.log(update);
          })
        }

        this.props.onReceiveLevel(response);
        this._displayLevel(response, currentChar);

      }.bind(this));
    }
  },

  _displayLevel: function(level, currentChar) {
    delete level.area;
    _.remove(level.entities, function(entity) {
      return entity._id == currentChar
    });
    this.setState({level: level});
  }
});

module.exports = Level;

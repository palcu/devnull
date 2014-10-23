/** @jsx React.DOM */
/* global document, window */


var React = require('react'),
    Party = require('./components/party.jsx'),
    CreateCharacter = require('./components/create-char.jsx'),
    CurrentCharacter = require('./components/current-char.jsx'),
    Level = require('./components/level.jsx'),
    ControlCharMixin = require('./mixins/control-char.js'),
    BigMap = require('./components/big-map.jsx'),
    _ = require('lodash'),
    $ = require('jquery');

var Game = React.createClass({
  mixins: [ControlCharMixin],

  getInitialState: function() {
    var m = [];
    for (var i=0; i<100; i++) {
      m.push([]);
      for (var j=0; j<100; j++) {
        m[i].push(0);
      }
    }

    return {
      currentChar: "",
      maxX: 50,
      maxY: 50,
      cornerLeftTop: {x:0, y:0},
      cornerRightBottom: {x:4, y:4},
      bigMap: m,
      currentX: 0,
      currentY: 0
    };
  },

  render: function() {
    return <div className="flex-container">
      <div className="flex-item">
        <CreateCharacter />
      </div>
      <div className="flex-item">
        <Party onCallback={this.onCharacterSelect} />
        <CurrentCharacter currentChar={this.state.currentChar} />
        <Level currentChar={this.state.currentChar}
               onReceiveLevel={this.onReceiveLevel} />
      </div>
      <div className="flex-map">
        <BigMap area={this.state.bigMap}
             currentX={this.state.currentX}
             currentY={this.state.currentY}
             cornerLeftTop={this.state.cornerLeftTop}
             cornerRightBottom={this.state.cornerRightBottom} />
      </div>
    </div>;
  },

  onCharacterSelect: function(character) {
    this.setState({currentChar: character});
  },

  onReceiveLevel: function(level) {
    var nextMap = _.clone(this.state.bigMap);
    var receivedMap = level.area;
    for (var i=0; i<receivedMap[0].length; i++) {
      for (var j=0; j<receivedMap.length; j++) {
        nextMap[level.bx + i][level.by + j] = receivedMap[i][j];
      }
    }
    this.setState({bigMap: nextMap});
  }
});


// Because you never know
window.React = React;
window.$ = $;

React.renderComponent(
  <Game />,
  document.getElementById('container')
);

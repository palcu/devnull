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
        m[i].push(-1);
      }
    }

    return {
      currentChar: "",
      maxX: 50,
      maxY: 50,
      cornerLeftTop: null,
      cornerRightBottom: null,
      bigMap: m,
      currentX: null,
      currentY: null
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
        nextMap[level.bx + i][level.by + j] = receivedMap[j][i];
      }
    }

    var nextCornerLeftTop = {},
        nextCornerRightBottom = {};
    if (this.state.cornerLeftTop) {
      nextCornerLeftTop.x = Math.min(this.state.cornerLeftTop.x, level.bx);
      nextCornerLeftTop.y = Math.min(this.state.cornerLeftTop.y, level.by);
      nextCornerRightBottom.x = Math.max(this.state.cornerRightBottom.x,
                                    level.bx + receivedMap.length - 1);
      nextCornerRightBottom.y = Math.max(this.state.cornerRightBottom.y,
                                    level.by + receivedMap[0].length - 1);
    } else {
      nextCornerLeftTop = {
        x: level.bx,
        y: level.by
      };
      nextCornerRightBottom = {
        x: level.bx + receivedMap.length - 1,
        y: level.by + receivedMap[0].length - 1
      };
    }
    // console.table(nextMap)

    this.setState({
      bigMap: nextMap,
      currentX: level.x,
      currentY: level.y,
      cornerLeftTop: nextCornerLeftTop,
      cornerRightBottom: nextCornerRightBottom
      // bigMap: level.area
      // cornerLeftTop: {x: 0, y: 0},
      // cornerRightBottom: {x:15, y: 15},
      // currentX: 2,
      // currentY: 2
    });
  }
});


// Because you never know
window.React = React;
window.$ = $;

React.renderComponent(
  <Game />,
  document.getElementById('container')
);

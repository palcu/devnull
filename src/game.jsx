/** @jsx React.DOM */


var React = require('react'),
    Party = require('./components/party.jsx'),
    CreateCharacter = require('./components/create-char.jsx'),
    CurrentCharacter = require('./components/current-char.jsx'),
    Level = require('./components/level.jsx'),
    BigMap = require('./components/big-map.jsx'),
    _ = require('lodash'),
    Constants = require('./constants.js'),
    localStorage = require('./lib/local-storage.js');

var Game = React.createClass({
  getInitialState: function() {
    var m = [];
    for (var i=0; i<100; i++) {
      m.push([]);
      for (var j=0; j<100; j++) {
        m[i].push(-1);
      }
    }

    return {
      maxX: 50,
      maxY: 50,
      entities: {},
      cornerLeftTop: null,
      cornerRightBottom: null,
      currentMap: null,
      bigMap: m,
      currentX: null,
      currentY: null,
      firstStart: true
    };
  },

  render: function() {
    return <div className="flex-container">
      <div className="flex-item">
        <Level currentChar={this.props.currentChar}
               onReceiveLevel={this.onReceiveLevel} />
        <CreateCharacter />
      </div>
      <div className="flex-item">
        <Party onCallback={this.props.onCharacterSelect} />
        <CurrentCharacter currentChar={this.props.currentChar} />
      </div>
      <div className="flex-map">
        <BigMap area={this.state.bigMap}
             currentX={this.state.currentX}
             currentY={this.state.currentY}
             cornerLeftTop={this.state.cornerLeftTop}
             cornerRightBottom={this.state.cornerRightBottom}
             entities={this.state.entities} />
      </div>
    </div>;
  },

  onReceiveLevel: function(level) {
    this._parseMap(level);
    this._parseEntities(level);
  },

  _parseEntities: function(level) {
    var receivedEntities = level.entities;
    var nextEntities = {};
    if (localStorage.isMapSaved(level.map) && this.state.firstStart) {
      nextEntities = localStorage.getLocalStorageKey(level.map, 'entities');
    } else {
      nextEntities = _.clone(this.state.entities);
    }
    receivedEntities.forEach(function(entity) {
      nextEntities[entity._id] = entity;
      nextEntities[entity._id].last_updated = Date.now();
    });

    nextEntities = this._removeDeadEntities(nextEntities);
    localStorage.getLocalStorageKey(level.map, {entities: nextEntities});
    this.setState({entities: nextEntities});
  },

  _removeDeadEntities: function(entities) {
    for (var entity in entities) {
      if (Date.now() - entities[entity].last_updated >
            Constants.ENTITY_IS_REMOVED_INTERVAL) {
        delete entities[entity];
      }
    }
    return entities;
  },

  _parseMap: function(level) {
    var nextMap;
    if (localStorage.isMapSaved(level.map) && this.state.firstStart) {
      nextMap = localStorage.getLocalStorageKey(level.map, 'bigMap');
    } else {
      nextMap = _.clone(this.state.bigMap);
    }

    var receivedMap = level.area;

    for (var i=0; i<receivedMap[0].length; i++) {
      for (var j=0; j<receivedMap.length; j++) {
        nextMap[level.bx + i][level.by + j] = receivedMap[j][i];
      }
    }

    var nextCornerLeftTop = {},
        nextCornerRightBottom = {};
    if (!this.state.firstStart) {
      nextCornerLeftTop.x = Math.min(this.state.cornerLeftTop.x, level.bx);
      nextCornerLeftTop.y = Math.min(this.state.cornerLeftTop.y, level.by);
      nextCornerRightBottom.x = Math.max(this.state.cornerRightBottom.x,
                                    level.bx + receivedMap.length - 1);
      nextCornerRightBottom.y = Math.max(this.state.cornerRightBottom.y,
                                    level.by + receivedMap[0].length - 1);
    } else if (this.state.firstStart && !localStorage.isMapSaved(level.map)) {
      nextCornerLeftTop = {
        x: level.bx,
        y: level.by
      };
      nextCornerRightBottom = {
        x: level.bx + receivedMap.length - 1,
        y: level.by + receivedMap[0].length - 1
      };
    } else {
      nextCornerLeftTop = localStorage.getLocalStorageKey(level.map, 'cornerLeftTop');
      nextCornerRightBottom = localStorage.getLocalStorageKey(level.map, 'cornerRightBottom');
    }

    localStorage.getLocalStorageKey(level.map, {
      cornerLeftTop: nextCornerLeftTop,
      cornerRightBottom: nextCornerRightBottom,
      bigMap: nextMap
    });

    this.setState({
      bigMap: nextMap,
      currentMap: level.map,
      currentX: level.x,
      currentY: level.y,
      cornerLeftTop: nextCornerLeftTop,
      cornerRightBottom: nextCornerRightBottom,
      firstStart: false
    });
  }
});

module.exports = Game;

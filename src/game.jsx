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
    $ = require('jquery'),
    Constants = require('./constants.js');

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
      entities: {},
      cornerLeftTop: null,
      cornerRightBottom: null,
      bigMap: m,
      currentX: null,
      currentY: null,
      firstStart: true
    };
  },

  render: function() {
    return <div className="flex-container">
      <div className="flex-item">
        <Level currentChar={this.state.currentChar}
               onReceiveLevel={this.onReceiveLevel} />
        <CreateCharacter />
      </div>
      <div className="flex-item">
        <Party onCallback={this.onCharacterSelect} />
        <CurrentCharacter currentChar={this.state.currentChar} />
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

  onCharacterSelect: function(character) {
    this.setState({currentChar: character});
  },

  onReceiveLevel: function(level) {
    this._parseMap(level);
    this._parseEntities(level);
  },

  _parseEntities: function(level) {
    var receivedEntities = level.entities;
    var nextEntities = {};
    if (this._isMapSaved(level.map) && this.state.firstStart) {
      nextEntities = this._getLocalStorageKey(level.map, 'entities');
    } else {
      nextEntities = _.clone(this.state.entities);
    }
    receivedEntities.forEach(function(entity) {
      nextEntities[entity._id] = entity;
      nextEntities[entity._id].last_updated = Date.now();
    });

    nextEntities = this._removeDeadEntities(nextEntities);
    this._setLocalStorageKeys(level.map, {entities: nextEntities});
    this.setState({entities: nextEntities});
  },

  _removeDeadEntities: function(entities) {
    for (var entity in entities) {
      if (Date.now() - entities[entity].last_updated >
            Constants.ENTITY_IS_REMOVED_INTERVAL) {
        delete entities[entity]
      }
    }
    return entities;
  },

  _parseMap: function(level) {
    var nextMap;
    if (this._isMapSaved(level.map) && this.state.firstStart) {
      nextMap = this._getLocalStorageKey(level.map, 'bigMap');
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
    } else if (this.state.firstStart && !this._isMapSaved(level.map)) {
      nextCornerLeftTop = {
        x: level.bx,
        y: level.by
      };
      nextCornerRightBottom = {
        x: level.bx + receivedMap.length - 1,
        y: level.by + receivedMap[0].length - 1
      };
    } else {
      nextCornerLeftTop = this._getLocalStorageKey(level.map, 'cornerLeftTop');
      nextCornerRightBottom = this._getLocalStorageKey(level.map, 'cornerRightBottom');
    }

    this._setLocalStorageKeys(level.map, {
      cornerLeftTop: nextCornerLeftTop,
      cornerRightBottom: nextCornerRightBottom,
      bigMap: nextMap
    });

    this.setState({
      bigMap: nextMap,
      currentX: level.x,
      currentY: level.y,
      cornerLeftTop: nextCornerLeftTop,
      cornerRightBottom: nextCornerRightBottom,
      firstStart: false
    });
  },

  _isMapSaved: function(bigMap) {
    /**
     * Map should be already saved.
     */
    return this._getLocalStorageKey(bigMap, 'bigMap') !== null;
  },

  _getLocalStorageKey: function(bigMap, key) {
    return JSON.parse(window.localStorage.getItem(bigMap + ':' + key));
  },

  _setLocalStorageKeys: function(bigMap, dict) {
    for (var key in dict) {
      window.localStorage.setItem(bigMap + ':' + key,
                                  JSON.stringify(dict[key]));
    }
  }
});


// Because you never know
window.React = React;
window.$ = $;

React.renderComponent(
  <Game />,
  document.getElementById('container')
);

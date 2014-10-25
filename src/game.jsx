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
    return {
      maxX: 120,
      maxY: 120,
      entities: {},
      items: {},
      locations: [],
      cornerLeftTop: null,
      cornerRightBottom: null,
      currentMap: null,
      bigMap: this._getEmptyMatrix(),
      currentX: null,
      currentY: null,
      firstStart: true
    };
  },

  render: function() {
    return <div className="flex-container">
      <div className="flex-item">
        <CreateCharacter characterId={this.props.currentChar} />
        <Level currentChar={this.props.currentChar}
               onReceiveLevel={this.onReceiveLevel} />
      </div>
      <div className="flex-item">
        <CurrentCharacter currentChar={this.props.currentChar} />
        <Party onCallback={this.props.onCharacterSelect} />
      </div>
      <div className="flex-map">
        <BigMap area={this.state.bigMap}
             currentX={this.state.currentX}
             currentY={this.state.currentY}
             cornerLeftTop={this.state.cornerLeftTop}
             cornerRightBottom={this.state.cornerRightBottom}
             entities={this.state.entities}
             locations={this.state.locations}
             items={this.state.items}
             mapName={this.state.currentMap} />
      </div>
    </div>;
  },

  onReceiveLevel: function(level) {
    this._parseMap(level);
    this._parseEntities(level);
    this._parseLocations(level);
    this._parseItems(level);
  },

  _parseLocations: function(level) {
    var nextLocations = [];
    nextLocations.push({
      name: 'stairsup',
      x: level.stairsup.x,
      y: level.stairsup.y
    });
    nextLocations.push({
      name: 'stairsdown',
      x: level.stairsdown.x,
      y: level.stairsdown.y
    });
    level.forges.forEach(function(forge) {
      nextLocations.push({
        name: 'forge',
        x: forge.x,
        y: forge.y
      });
    });
    level.healingpools.forEach(function(healingpool) {
      nextLocations.push({
        name: 'healingpool',
        x: healingpool.x,
        y: healingpool.y
      });
    });
    level.manapools.forEach(function(manapool) {
      nextLocations.push({
        name: 'manapool',
        x: manapool.x,
        y: manapool.y
      });
    });
    this.setState({locations: nextLocations});
  },

  _parseEntities: function(level) {
    var receivedEntities = level.entities;
    var nextEntities = {};
    if (localStorage.isKeySaved(level.map, 'entities') && this.state.firstStart) {
      nextEntities = localStorage.getLocalStorageKey(level.map, 'entities');
    } else if (this.state.currentMap === level.map) {
      nextEntities = _.clone(this.state.entities);
    }
    receivedEntities.forEach(function(entity) {
      nextEntities[entity._id] = entity;
      nextEntities[entity._id].last_updated = Date.now();
    });

    nextEntities = this._removeOldStuff(nextEntities,
                                        Constants.ENTITY_IS_REMOVED_INTERVAL);

    localStorage.setLocalStorageKeys(level.map, {entities: nextEntities});
    this.setState({entities: nextEntities});
  },

  _parseItems: function(level) {
    var receivedItems = level.items;
    var nextItems = {};
    if (localStorage.isKeySaved(level.map, 'items') && this.state.firstStart) {
      nextItems = localStorage.getLocalStorageKey(level.map, 'items');
    } else if (this.state.currentMap === level.map) {
      nextItems = _.clone(this.state.items);
    }
    receivedItems.forEach(function(item) {
      nextItems[item._id] = item;
      nextItems[item._id].last_updated = Date.now();
    });

    nextItems = this._removeOldStuff(nextItems,
                                     Constants.ITEM_IS_REMOVED_INTERVAL);

    localStorage.setLocalStorageKeys(level.map, {items: nextItems});
    this.setState({items: nextItems});
  },

  _removeOldStuff: function(stuff, interval) {
    for (var item in stuff) {
      if (Date.now() - stuff[item].last_updated > interval) {
        delete stuff[item];
      }
    }
    return stuff;
  },

  _parseMap: function(level) {
    var nextMap;
    var nextCornerLeftTop = {},
        nextCornerRightBottom = {};
    if (localStorage.isKeySaved(level.map, 'bigMap') && this.state.currentMap != level.map) {
      nextMap = localStorage.getLocalStorageKey(level.map, 'bigMap');
    } else if (this.state.currentMap === level.map) {
      nextMap = _.clone(this.state.bigMap);
    } else {
      nextMap = this._getEmptyMatrix();
    }

    var receivedMap = level.area;

    for (var i=0; i<receivedMap[0].length; i++) {
      for (var j=0; j<receivedMap.length; j++) {
        nextMap[level.bx + i][level.by + j] = receivedMap[j][i];
      }
    }

    if (this.state.currentMap === level.map) {
      nextCornerLeftTop.x = Math.min(this.state.cornerLeftTop.x, level.bx);
      nextCornerLeftTop.y = Math.min(this.state.cornerLeftTop.y, level.by);
      nextCornerRightBottom.x = Math.max(this.state.cornerRightBottom.x,
                                    level.bx + receivedMap.length - 1);
      nextCornerRightBottom.y = Math.max(this.state.cornerRightBottom.y,
                                    level.by + receivedMap[0].length - 1);
    } else if (!localStorage.isKeySaved(level.map, 'bigMap') &&
               this.state.currentMap !== level.map) {
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

    localStorage.setLocalStorageKeys(level.map, {
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
  },

  _getEmptyMatrix: function() {
    var m = [];
    for (var i=0; i<100; i++) {
      m.push([]);
      for (var j=0; j<100; j++) {
        m[i].push(-1);
      }
    }
    return m;
  },

  _isDead: function(monster) {
    console.log(monster);
  }
});

module.exports = Game;

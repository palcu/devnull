/** @jsx React.DOM */

var React = require('react'),
    Cell = require('./cell.jsx'),
    _ = require('lodash');

var BigMap = React.createClass({
  getDefaultProps: function() {
    return {area: [[]]};
  },

  render: function() {
    if (this.props.cornerLeftTop) {
      var rows = [];
      var entitiesCollection = this._getCollection(this.props.entities);
      var itemsCollection = this._getCollection(this.props.items);

      for (var i=this.props.cornerLeftTop.x; i<=this.props.cornerRightBottom.x; i++) {
        var items = [];
        for (var j=this.props.cornerLeftTop.y; j<=this.props.cornerRightBottom.y; j++) {
          var entity = _.find(entitiesCollection, {x: i, y: j});
          var location = _.find(this.props.locations, {x: i, y: j});
          var item = _.find(itemsCollection, {x: i, y: j});
          var target = false;
          for (var x in this.props.targets) {
            if (this.props.targets[x].x === i && this.props.targets[x].y === j) {
              target = true;
              break;
            }
          }
          var key = i + '-' + j;

          var isMyCharacter = (i === this.props.currentX &&
                               j === this.props.currentY);
          items.push(<Cell isMyCharacter={isMyCharacter}
                           number={this.props.area[i][j]}
                           key={key}
                           entity={entity}
                           location={location}
                           item={item}
                           target={target} />);
        }
        rows.push(<tr key={i}>{items}</tr>);
      }

      return <div>
        <p>
          {this.props.mapName} - offset
          ({this.props.cornerLeftTop.x},{this.props.cornerLeftTop.y}) and
          ({this.props.cornerRightBottom.x},{this.props.cornerRightBottom.y})
        </p>
        <table className="big-map"><tbody>{rows}</tbody></table>
      </div>;
    }
    return <div>"Waiting for character..."</div>;
  },

  _getCollection: function(objects) {
    var v = [];
    for (var obj in objects) {
      v.push(objects[obj]);
    }
    return v;
  }
});

module.exports = BigMap;

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
      var entitiesCollection = this._getEntitiesCollection();

      for (var i=this.props.cornerLeftTop.x; i<=this.props.cornerRightBottom.x; i++) {
        var items = [];
        for (var j=this.props.cornerLeftTop.y; j<=this.props.cornerRightBottom.y; j++) {
          var entity = _.find(entitiesCollection, {x: i, y: j});
          var key = i + '-' + j;

          var isMyCharacter = (i === this.props.currentX &&
                               j === this.props.currentY);
          items.push(<Cell isMyCharacter={isMyCharacter}
                           number={this.props.area[i][j]}
                           key={key}
                           entity={entity} />);
        }
        rows.push(<tr key={i}>{items}</tr>);
      }

      return <div>
        <p>
          Offset
          ({this.props.cornerLeftTop.x},{this.props.cornerLeftTop.y}) and
          ({this.props.cornerRightBottom.x},{this.props.cornerRightBottom.y})
        </p>
        <table className="big-map"><tbody>{rows}</tbody></table>
      </div>;
    }
    return <div>"Waiting for character..."</div>;
  },

  _getEntitiesCollection: function() {
    v = []
    for (var entity in this.props.entities) {
      v.push(this.props.entities[entity]);
    }
    return v;
  }
});

module.exports = BigMap;

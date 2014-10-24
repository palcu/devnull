/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    cx = require('react/addons').addons.classSet;


var Cell = React.createClass({
  getDefaultProps: function() {
    return {entity: {}};
  },

  render: function() {
    var elementInMap = this._getElement();
    var classes = cx({
      'my-character': this.props.isMyCharacter,
      'unvisited': (elementInMap === '#'),
      'unwalkable': (elementInMap === '$'),
      'entity-monster': this.props.entity.type === 'monster'
    });

    return <td className={classes} onClick={this.cellOnClick}>
      {elementInMap}
    </td>;
  },

  cellOnClick: function() {
    console.log(this.props.number);
    if (this.props.entity) {
      console.log(this.props.entity);
    }
  },

  _getElement: function() {
    if (this.props.entity._id) {
      return '@';
    }
    if (this.props.number < 0) {
      return '#';
    }
    if (this.props.number === 0 || this.props.number === 16) {
      return '$';
    }
    return ' ';
  }
});

module.exports = Cell;

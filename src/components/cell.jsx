/** @jsx React.DOM */

var React = require('react'),
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
      'entity-monster': this.props.entity.type === 'monster',
      'location': this.props.location,
      'item': this.props.item
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
    if (this.props.location) {
      console.log(this.props.location);
    }
    if (this.props.item) {
      console.log(this.props.item);
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
    if (this.props.location) {
      var mapping = {
        'manapool': 'M',
        'forge': 'F',
        'healingpool': 'H',
        'stairsdown': 'D',
        'stairsup': 'U'
      }
      return mapping[this.props.location.name];
    }
    if (this.props.item) {
      return 'I';
    }
    return ' ';
  }
});

module.exports = Cell;

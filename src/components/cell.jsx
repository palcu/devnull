/** @jsx React.DOM */

var React = require('react'),
    $ = require('jquery'),
    cx = require('react/addons').addons.classSet,;


var Cell = React.createClass({
  render: function() {
    var tooltip = <Tooltip>this.props.number</Tooltip>

    var elementInMap = this._getElementFor(this.props.number);
    var classes = cx({
      'character': this.props.isCharacter,
      'unvisited': (elementInMap === '#'),
      'unwalkable': (elementInMap === '$')
    });

    return <td className={classes}>
      <OverlayTrigger overlay={tooltip}>
        <span>{elementInMap}</span>
      </OverlayTrigger>
    </td>;
  },

  _getElementFor: function(number) {
    if (number < 0) {
      return '#';
    } else if (number === 0 || number === 16) {
      return '$';
    } else {
      return number;
    }
  }
});

module.exports = Cell;

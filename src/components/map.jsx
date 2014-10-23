/** @jsx React.DOM */

var React = require('react'),
    cx = require('react/addons').addons.classSet;

var Map = React.createClass({
  getDefaultProps: function() {
    return {area: [[]]};
  },

  render: function() {
    var table = <table></table>;

    return <table>
      {this.props.area.map(function(row, i) {
        return <tr key={i}>
          {row.map(function(cell, j) {
            var isCharacter = (i == this.props.currentX &&
                               j == this.props.currentY)
            var classes = cx({
              'character': isCharacter
            });
            return <td className={classes} key={j}>{cell}</td>;
          }.bind(this))}
        </tr>;
      }.bind(this))}
    </table>;
  }
});

module.exports = Map;

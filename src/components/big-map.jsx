/** @jsx React.DOM */

var React = require('react'),
    cx = require('react/addons').addons.classSet;

var BigMap = React.createClass({
  getDefaultProps: function() {
    return {area: [[]]};
  },

  render: function() {
    if (this.props.cornerLeftTop) {
      var rows = [];

      for (var i=this.props.cornerLeftTop.x; i<=this.props.cornerRightBottom.x; i++) {
        var items = [];
        for (var j=this.props.cornerLeftTop.y; j<=this.props.cornerRightBottom.y; j++) {
          var isCharacter = (i === this.props.currentX &&
                             j === this.props.currentY);
          var classes = cx({
            'character': isCharacter
          });
          var key = i + '-' + j;
          items.push(<td className={classes} key={key}>{this.props.area[i][j]}</td>);
        }
        rows.push(<tr key={i}>{items}</tr>);
      }

      return <div>
        <p>
          Offset
          ({this.props.cornerLeftTop.x},{this.props.cornerLeftTop.y}) and
          ({this.props.cornerRightBottom.x},{this.props.cornerRightBottom.y})
        </p>
        <table>{rows}</table>
      </div>;
    }
    return <div>"Waiting for character..."</div>;
  }
});

module.exports = BigMap;

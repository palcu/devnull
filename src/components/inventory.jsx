/** @jsx React.DOM */

var React = require('react'),
    InventoryItem = require('./inventory-item.jsx');

var Inventory = React.createClass({
  render: function() {
    var items = [];
    this.props.items.forEach(function(item) {
      items.push(<InventoryItem key={item}
                                id={item}
                                onDrop={this.props.onDrop}
                                onUse={this.props.onUse} />);
    }.bind(this))

    return <div>
      <h1>Inventory</h1>
      <ul>
        {items}
      </ul>
    </div>;
  }
});

module.exports = Inventory;

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
                                onUse={this.props.onUse}
                                onRepair={this.props.onRepair} />);
    }.bind(this));

    return <div>
      <h1>Inventory ({this.props.items.length}/10)</h1>
      <p><a href="#" onClick={this.props.onUnwieldArmor}>Unwield Armor</a></p>
      <p><a href="#" onClick={this.props.onUnwieldWeapon}>Unwield Weapon</a></p>
      <ul className="inventory">
        {items}
      </ul>
    </div>;
  }
});

module.exports = Inventory;

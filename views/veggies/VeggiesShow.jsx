const React = require("react");
class Show extends React.Component {
  render() {
    const veggie = this.props.veggie;
    return (
      <div>
        <h1> Veggies Show Page </h1>
        The {veggie.name} is {veggie.color}.
        {veggie.readyToEat
          ? "It is ready to eat"
          : "It is NOT ready to eat... Cant touch this"}
      </div>
    );
  }
}
module.exports = Show;

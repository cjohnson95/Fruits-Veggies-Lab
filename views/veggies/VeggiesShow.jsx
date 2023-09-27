const React = require("react")
const DefaultLayout = require('../layouts/Default');
class Show extends React.Component {
  render() {
    const veggie = this.props.veggie
    console.log(veggie)
    return (
      <DefaultLayout title={"Veggies Show Page"}>
        The {veggie.name} is {veggie.color}.{" "}
        {veggie.readyToEat
          ? "It is ready to eat"
          : "It is not ready to eat... Cant touch this"}
      <br/>
      <a href='/veggies'>Home</a>
      </DefaultLayout>
    )
  }
}
module.exports = Show









// const React = require("react");
// class Show extends React.Component {
//   render() {
//     const veggie = this.props.veggie;
//     return (
//       <div>
//         <h1> Veggies Show Page </h1>
//         The {veggie.name} is {veggie.color}.
//         {veggie.readyToEat
//           ? "It is ready to eat"
//           : "It is NOT ready to eat... Cant touch this"}
//       </div>
//     );
//   }
// }
// module.exports = Show;

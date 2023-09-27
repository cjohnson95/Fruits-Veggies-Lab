const React = require("react");
const DefaultLayout = require("../layouts/Default");

class VeggiesIndex extends React.Component {
  render() {
    const veggies = this.props.veggies;
    // console.log({ props: this.props.veggies });
    return (
      <DefaultLayout title={"Vegetable Index Page"}>
        <nav>
          <a href="/veggies/new">Create a New Vegetable</a>
        </nav>
        <ul>
          {this.props.veggies.map((veggie, i) => {
            return (
              <li key={i}>
                <a href={`/veggies/${veggie.id}`}>{veggie.name}</a>
                is{" "}
                {veggie.readyToEat ? (
                  <span>It is ready to eat</span>
                ) : (
                  <span> It is not ready to eat </span>
                )}
                {/* Your Delete Form Goes Here  It's incomplete we will fix below*/}
                <form
                  action={`/veggies/${veggie._id}?_method=DELETE`}
                  method="POST"
                >
                  <input type="submit" value="DELETE" />
                </form>
                <a href={`/veggies/${veggie._id}/edit`}>Edit This Vegetable</a>
              </li>
            );
          })}
        </ul>
      </DefaultLayout>
    );
  }
}

module.exports = VeggiesIndex;

// const React = require("react");

// class Index extends React.Component {
//   render() {
//     const { veggies } = this.props;
//     return (
//       <div>
//         <h1>Veggies Index Page</h1>
//         <ul>
//           {veggies.map((veggie, i) => {
//             return (
//               <li>
//                 The <a href={`/veggies/${i}`}>{veggie.name}</a> is{" "}
//                 {veggie.color} <br></br>
//                 {veggie.readyToEat
//                   ? `It is ready to eat`
//                   : `It is not ready to eat`}
//                 <br />
//               </li>
//             );
//           })}
//         </ul>
//         <nav>
//           <a href="/veggies/new">Create a New Veggie</a>
//         </nav>
//       </div>
//     );
//   }
// }
// module.exports = Index;

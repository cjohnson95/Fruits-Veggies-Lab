//step one: import mongoose

const mongoose = require("mongoose");
//step 2 create schema

const veggieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vegetable name is required"],
  },
  color: {
    type: String,
    required: true,
  },
  readyToEat: {
    type: Boolean,
  },
});

//step 2 create model using schema

const Veggie = mongoose.model("Veggie", veggieSchema);

//step 4 export newly created model

module.exports = Veggie;


// const veggies = [
//   {
//     name: "corn",
//     color: "yellow",
//     readyToEat: true,
//   },
//   {
//     name: "cucumber",
//     color: "green",
//     readyToEat: true,
//   },
//   {
//     name: "napa cabbage",
//     color: "black",
//     readyToEat: false,
//   },
//   {
//     name: "daikon raddish",
//     color: "white",
//     readyToEat: true,
//   },
//   {
//     name: "collard greens",
//     color: "yellow",
//     readyToEat: false,
//   },
// ];

// module.exports = veggies;

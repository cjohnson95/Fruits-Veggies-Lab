//step one: import mongoose

const mongoose = require("mongoose");
//step 2 create schema

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Fruit name is required"],
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

const Fruit = mongoose.model("Fruit", fruitSchema);

//step 4 export newly created model

module.exports = Fruit;

// const fruits = [
//   {
//     name: "apple",
//     color: "red",
//     readyToEat: true,
//   },
//   {
//     name: "pear",
//     color: "green",
//     readyToEat: false,
//   },
//   {
//     name: "banana",
//     color: "yellow",
//     readyToEat: true,
//   },
// ];





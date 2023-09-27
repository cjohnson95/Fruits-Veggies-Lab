// Add dotenv
require("dotenv").config();
// Load express...
const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");
const PORT = process.env.PORT || 8000;

const methodOverride = require("method-override");

const mongoose = require("mongoose");
// connect to Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// data
// const fruits = require('./models/fruits')
const vegetables = require("./models/veggies");
const Fruit = require("./models/fruits.js");

// adding our view templates

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine())//near the top, around other app.use() calls
// ```javascript
// app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'
// ```;
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

// seed route
app.get("/fruits/seed", async (req, res) => {
  try {
    await Fruit.create([
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: false,
      },
      {
        name: "avocado",
        color: "green",
        readyToEat: true,
      },
    ]);
    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
  }
});

// routes INDUCES
// Index route - All the fruits
app.get("/fruits/", async (req, res) => {
  // res.send(fruits);
  // res.render("fruits/Index", { fruits: fruits });
  try {
    const fruits = await Fruit.find();
    res.render("fruits/FruitsIndex", { fruits: fruits });
  } catch (error) {
    console.error(error);
  }
});

app.get("/veggies/", async (req, res) => {
  // res.send(fruits);
  // res.render("fruits/Index", { fruits: fruits });
  try {
    const veggies = await Fruit.find();
    res.render("veggies/VeggiesIndex", { veggies: veggies });
  } catch (error) {
    console.error(error);
  }
});

// New - get the form to add a new fruit
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

app.get("/veggies/new", (req, res) => {
  res.render("veggies/New");
});

// Delete
app.delete("/fruits/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndRemove(req.params.id);
    res.redirect("/fruits"); //redirect back to fruits index
  } catch (error) {
    console.error(error);
  }
});

app.delete("/veggies/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndRemove(req.params.id);
    res.redirect("/veggies"); //redirect back to fruits index
  } catch (error) {
    console.error(error);
  }
});

// Update
app.put("/fruits/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    await Fruit.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/fruits");
  } catch (error) {
    console.log(error);
  }
});

app.put("/veggies/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    await Fruit.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/veggies");
  } catch (error) {
    console.log(error);
  }
});

//Create - Add a new fruit to your fruits
app.post("/fruits", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    await Fruit.create(req.body);

    res.redirect("/fruits");
  } catch (error) {
    console.log(error);
  }
});

app.post("/veggies", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    await Veggie.create(req.body);

    res.redirect("/veggies");
  } catch (error) {
    console.log(error);
  }
});
 
//Edit
app.get("/veggies/:id/edit", async (req, res) => {
  try {
    const foundVeggie = await Fruit.findById(req.params.id);
    res.render("veggies/Edit", { veggie: foundVeggie });
  } catch (error) {
    console.log(error);
  }
});

app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Edit", { fruit: foundFruit });
  } catch (error) {
    console.log(error);
  }
});

// Show route - one particular fruit by ID
app.get("/fruits/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);

    res.render("fruits/FruitsShow", { fruit: fruit });
  } catch (error) {
    console.log(error);
  }
});

app.get("/veggies/:indexOfVegArray", (req, res) => {
  res.render("vegetables/VeggiesShow", {
    veg: vegetables[req.params.indexOfVegArray],
  }); // renders the info using the appropriate template
});

app.listen(PORT, () => {
  console.log("listening on", PORT);
});

// URL	HTTP Verb	Action	Used For	Mongoose Model Function
// /things/	GET	index	Displaying a list of all things	.find
// /things/new	GET	new	Display HTML form for creating a new thing	N/A
// /things	POST	create	Create a new thing	.create
// /things/:id	GET	show	Display a specific thing	.findById
// /things/:id/edit	GET	edit	Return an HTML form for editing a thing	.findById
// /things/:id	PATCH/PUT	update	Update a specific thing	.findByIdAndUpdate
// /things/:id	DELETE	destroy	Delete a specific thing	.findByIdAndDelete

// If You Need to Remove node_modules
// In order for deployment to work, you can't have node_modulesin your repo. Instead, your deployment service will add this dir itself!

// go to local repo dir
// rm -rf node_modules
// use git to: add, then commit, push
// touch .gitignore
// code .gitignore
// add a line that says just node_modulesto .gitignore
// save .gitignore
// git: add, commit, push
// to get it working locally again: npm install

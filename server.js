const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");

//data

const fruits = require("./models/fruits");
const veggies = require("./models/veggies");
//routes
//index route
//-------------------------------------------------------

//adding our view templates
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});
//-------------------------------------------------------------
//routes induces
app.get("/fruits/", (req, res) => {
  // res.send(fruits);
  res.render("fruits/FruitsIndex", { fruits: fruits });
});

app.get("/veggies/", (req, res) => {
  // res.send(veggies);
  res.render("veggies/VeggiesIndex", { veggies: veggies });
});

// New route get form to add a new fruit
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

app.get("/veggies/new", (req, res) => {
  res.render("veggies/New");
});

//delete
//update
//create
app.post('/fruits', (req, res)=>{
  if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
  } else { //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
  }
  fruits.push(req.body);
  console.log(fruits);
  // res.send('data received');
  res.redirect('/fruits')
});

app.post('/veggies', (req, res)=>{
  if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
  } else { //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
  }
  veggies.push(req.body);
  console.log(veggies);
  // res.send('data received');
  res.redirect('/veggies')
});
//show route
app.get("/fruits/:indexOfFruitsArray", (req, res) => {
  // res.send(fruits[req.params.indexOfFruitsArray]);
  res.render("fruits/FruitsShow", {
    fruit: fruits[req.params.indexOfFruitsArray],
  }); // renders the info using the appropriate template
});

app.get("/veggies/:indexOfVeggiesArray", (req, res) => {
  // res.send(veggies[req.params.indexOfVeggiesArray]);
  res.render("veggies/VeggiesShow", {
    veggie: veggies[req.params.indexOfVeggiesArray],
  }); // renders the info using the appropriate template
});

app.listen(3000, () => {
  console.log("listening");
});

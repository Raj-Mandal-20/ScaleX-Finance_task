const express = require("express");
const bodyParser = require("body-parser");
const priceRoute = require('./routes/price');
const pairRoute = require("./routes/pair");
const volumeRoute = require('./routes/volume');
const errorHandlerRoute =  require('./routes/error');
const mongoose = require("mongoose");
const { createTradId } = require('./controllers/trading');
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.use(createTradId);
app.use(pairRoute);
app.use(priceRoute);
app.use(volumeRoute);

app.use((err, req, res, next)=>{
  console.log('Error Handler');
  console.error(err); 
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  res.status(500).json({ error: 'Internal Server Error' });
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then((res) => {
    console.log("Database Connection Successful :)");
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log("Some Error Occured while Connecting to the Database :(");
  });

const express = require('express');
const bodyParser = require('body-parser');
const tradingRoute = require('./routes/trading');
const mongoose = require('mongoose');
require('dotenv').config();

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


app.use(tradingRoute);
app.use('/', (req, res, next)=>{
    res.write('Hello World');
    res.end();
})

mongoose.connect(process.env.DATABASE_URL).then((res)=>{
    console.log('Database Connection Successful :)');
    // console.log(res);
}).catch(err=>{
    console.log('Some Error Occured while Connecting to the Database :(');
    // console.log(err);
})

app.listen(8080);

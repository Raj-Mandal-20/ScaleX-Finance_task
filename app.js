const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


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

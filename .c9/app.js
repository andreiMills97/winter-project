const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const path = require("path");
const db = require("./db")
const collection = "todo"
const hostname = '127.0.0.1';
const port = 3000;

db.connect((err) =>{
    if(err){
        console.log("Connection Failed")
        process.exit(1);
    }
    else{
        app.listen(port, ()=>{
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }
});
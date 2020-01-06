const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const path = require("path");

const db = require("./db");
const collection = "todo";

const hostname = '127.0.0.1';
const port = 8080;

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getTodos',(req,res)=>{
    //need toArray because find gives us a pointer
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{ 
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});


db.connect((err) =>{
    if(err){
        console.log("Connection Failed");
        process.exit(1);
    }
    else{
        app.listen(port, ()=>{
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }
});
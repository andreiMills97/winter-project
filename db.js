var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var dbname = "crudDB"
var url = "mongodb://localhost:27017/"; //where the db will be
var mongoOptions = {useNewUrlParser : true};

const state = { //is there a data base?
    db: null
};

const connect = (cb) => { //connect to the database
    if(state.db) //if database is connected
        cb();
    else{ // if not, gotta connect
        MongoClient.connect(url, mongoOptions, (err,client) =>{
            if (err) throw err;
            state.db = client.db(dbname);
            cb();
        });
        
    }
}

const getPrimaryKey = (_id) => { //primary keys by id
    return ObjectID(_id); //use for querying
}

const getDB = () =>{ //actually get the db
    return state.db;
}

module.exports = {getDB, connect, getPrimaryKey} //making these actually usable


MongoClient.connect(url, function(err, db) { 
    if (err){
        console.log("Connection Failed")
        process.exit(1);
    }
    else{
        console.log("Database created!");
    }

  //if (err) throw err;
  //collection (table)
  var dbo = db.db("itemsDB");
  dbo.createCollection("items", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  }); 

  if (err) throw err;
  //objects (records)
   var myItems= [
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'},
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: 'Valley 345'},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: 'Sky st 331'},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
  ];
  dbo.collection("items").insertMany(myItems, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
}); 

const MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var http = require('http').createServer(app);

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('static'))

var data;
  // Connection URL
  const url = 'mongodb://192.168.0.181:27017';
 
  // Database Name
  const dbName = 'Embeded_Systems_1';
 
  // Create a new MongoClient
  const client = new MongoClient(url);
 
  client.connect(function(err) {
    (async () => {
      try {
          await client.connect();
          console.log("Connected successfully to server");
          const db = client.db(dbName);
          var docs = await findDocuments(db);
          data = JSON.stringify(docs);
          client.close();
      }
      catch(error)
      {
          console.log(error);
      }
      })();
  
    client.close();
  });
 
  const findDocuments = async (db) => {
    // Get the documents collection
    const collection = db.collection('Labo_Opdr_4');
    // Find some documents
    docs = await collection.find().limit(60).toArray();
  return docs;
  }
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  app.get('/data.json', (req, res) => {
    res.send(data);
  });

  app.post('/', function (req, res) {
    console.log(req.body);
    res.sendFile(__dirname + '/index.html');
  });

  http.listen(3000, function(){
    console.log('listening on *:3000');
  });
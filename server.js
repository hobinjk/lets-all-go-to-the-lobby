/* jshint node: true */

var config = require('./config') || {};
var express = require('express');
var cors = require('cors');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var dbHost = config.dbHost || 'mongo.grids.me';
var dbPort = config.dbPort || '27017';
var dbName = config.dbName || 'sfethics';
var dbUsername = config.dbUsername;
var dbPassword = config.dbPassword;

var collectionData = {}; // this is somewhat terrible
var collections = ['lobbycontact', 'lobbymoney', 'filer460'];

console.log('Connecting to ' + dbHost + ':' + dbPort);

MongoClient.connect('mongodb://' + dbHost + ':' + dbPort + '/' + dbName +
    '?w=1',
function(err, db) {
  if (err) {
    console.log('ERROR: ' + err);
    return;
  }
  db.admin().authenticate(dbUsername, dbPassword, function(err, res) {
    if (!res) {
      console.log('Authentication error: ' + err);
      return;
    }

    function collect(collectionName) {
      console.log('Getting array for ' + collectionName);
      db.collection(collectionName).find().toArray(function(err, array) {
        console.log('Got array for ' + collectionName);
        collectionData[collectionName] = array;
      });
    }

    collections.forEach(collect);
  });
});

app.use(cors());
app.use(express.static(__dirname + '/public'));

// ROUTES
collections.forEach(function(collectionName) {
  app.get('/' + collectionName, function(req, res) {
    res.send(JSON.stringify(collectionData[collectionName]));
  });
});

app.listen(3000);

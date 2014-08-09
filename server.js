/* jshint node: true */

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var host = 'mongo.grids.me';
var port = 27017;

var lobbyContact = []; // this is bad and I should feel bad
var lobbyMoney = []; // this is also bad and I should continue feeling bad

console.log('Connecting to ' + host + ':' + port);

MongoClient.connect('mongodb://mongo.grids.me:27017/sfethics?w=1',
function(err, db) {
  if (err) {
    console.log('ERROR: ' + err);
    return;
  }
  console.log('db?: ' + db);
  db.admin().authenticate('CodeGuest', '9&Howard', function(err, res) {
    console.log('err: ' + err);
    console.log('res: ' + res);
    db.collection('lobbycontact').find().toArray(function(err, array) {
        lobbyContact = array;
    });
    db.collection('lobbymoney').find().toArray(function(err, array) {
        lobbyMoney = array;
    });
  });
});

app.use(express.static(__dirname + '/public'));

// ROUTES
app.get('/lobbymoney', function(req, res) {
  res.send(JSON.stringify(lobbyMoney));
});

app.get('/lobbycontact', function(req, res) {
  res.send(JSON.stringify(lobbyContact));
});

app.listen(3000);

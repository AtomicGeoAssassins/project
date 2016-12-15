// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
//var util = require("./util.js");
var bodyParser = require('body-parser');
var request = require('request');
var extend = require('extend');
var readDocument = require('./database.js').readDocument;
//var StatusUpdateSchema = require('./schemas/statusupdate.json');
var validate = require('express-jsonschema').validate;
var database = require('./database.js');
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var readEntireDocument = database.readEntireDocument;
var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/db';
var ResetDatabase = require('./resetdatabase');
var replySchema = require('./schemas/replySchema.json');
MongoClient.connect(url, function(err, db) {

  app.use(bodyParser.text());
  app.use(bodyParser.json());

  // You run the server from `server`, so `../client/build` is `server/../client/build`.
  // '..' means "go up one directory", so this translates into `client/build`!
  app.use(express.static('../client/build'));
  app.use('/mongo_express', mongo_express(mongo_express_config));

  /**
   * Get the user ID from a token. Returns -1 (an invalid ID)
   * if it fails.
   */
  function getUserIdFromToken(authorizationLine) {
    try {
      // Cut off "Bearer " from the header value.
      var token = authorizationLine.slice(7);
      // Convert the base64 string to a UTF-8 string.
      var regularString = new Buffer(token, 'base64').toString('utf8');
      // Convert the UTF-8 string into a JavaScript object.
      var tokenObj = JSON.parse(regularString);
      var id = tokenObj['id'];
      // Check that id is a number.
      if (typeof id === 'number') {
        return id;
      } else {
        // Not a number. Return -1, an invalid ID.
        return -1;
      }
    } catch (e) {
      // Return an invalid ID.
      return -1;
    }
  }

  //games index
  //obsolete, this pulls static data not stuff from the api
  //dont use me
  app.get('/games', function (req, res) {
    res.send(readEntireDocument('games'));
  });

  var futurePrice = function (final_price) { return Math.floor(final_price/2); }

  //retrieve a game
  app.get('/game/:gameid', function (req, res) {
    var games = []; //this will hold our games
    var appids = req.params.gameid.trim().split(',');
    appids.forEach(function (item) { //fyi foreach is not async
      request('http://store.steampowered.com/api/appdetails/?appids=' + item, function (error, query_response, query_body) {
        if (!error && query_response.statusCode == 200) {
          query_body = JSON.parse(query_body); //parse

          //join it all in an array
          Object.keys(query_body).forEach(function (appid) {
            var game = query_body[appid];
            if(game.success === true) {
              extend(game, { id: appid, appid: appid, name: game.data.name }); //initial data

              //pull out prices
              if(game.data.price_overview) { //some games are free
                var original_price = game.data.price_overview.initial;
                var final_price = game.data.price_overview.final;
                var future_price = futurePrice(final_price);
                extend(game, {original_price: original_price, final_price: final_price,
                  future_price: future_price}); //put them in the root
              }
              games.push(game); //add to our running list
            }
          });
        } else
          games.push("error on appid " + item);

        //if this is the last thing we can return
        if(games.length >= appids.length) {
          res.send(games); //after each send the response
          return;
        }
      });
    });
  });

  function lookupGame(gameid){
    var games = []; //this will hold our games
    var appids = gameid.trim().split(',');
    appids.forEach(function (item) { //fyi foreach is not async
      request('http://store.steampowered.com/api/appdetails/?appids=' + item, function (error, query_response, query_body) {
        if (!error && query_response.statusCode == 200) {
          query_body = JSON.parse(query_body); //parse

          //join it all in an array
          Object.keys(query_body).forEach(function (appid) {
            var game = query_body[appid];
            if(game.success === true) {
              extend(game, { id: appid, appid: appid, name: game.data.name }); //initial data

              //pull out prices
              if(game.data.price_overview) { //some games are free
                var original_price = game.data.price_overview.initial;
                var final_price = game.data.price_overview.final;
                var future_price = futurePrice(final_price);
                extend(game, {original_price: original_price, final_price: final_price,
                  future_price: future_price}); //put them in the root
              }
              games.push(game); //add to our running list
            }
          });
        } else
          games.push("error on appid " + item);

        //if this is the last thing we can return
        if(games.length >= appids.length) {
          return games;
        }
      });
    });
  }

  app.get('/forum/boards', function (req, res) {
    db.collection('boards').find({}, { title: 1}).toArray(function (err, doc) {
      res.send(doc);
    });
  });

  app.get('/forum/topics/:id', function (req,res) {
    db.collection('boards').findOne({_id: new ObjectID(req.params.id) }, {topics: 1}, function (err,doc) {
      if(doc) {
        res.send(doc.topics);
      } else res.status(500).end();
    });
  });

  function getReplies(topicId, cb) {
    db.collection('boards').findOne({ "topics._id": new ObjectID(topicId) }, { "topics.replies": 1 }, function (err,doc) {
      if(err) console.log(err);
      cb(err,doc);
    });
  }

  app.get('/forum/replies/:id', function (req,res) {
    getReplies(req.params.id, function (err,doc) {
      res.send(doc.topics[0].replies); //will only find one topic
    });
  });

  app.post('/forum/replies/:id', validate({body: replySchema}), function(req,res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if(fromUser) {
      var reply = {
        _id: new ObjectID(),
        content: req.body.content,
        user_id: new ObjectID(fromUser) 
      };
      db.collection('boards').updateOne({ "topics._id": new ObjectID(req.params.id) }, { $push: { "topics.$.replies": reply } }, function (err,doc) {
        if(err) {
          console.log(err);
        }
        getReplies(req.params.id, function (err,doc) {
          res.send(doc.topics[0].replies); //will only find one topic
        });
      });
    } else {
      res.status(422).end();
    }
  });

  //popular games
  app.get('/games/pricey', function (req, res) {
    request('http://store.steampowered.com/api/featured/', function (error, query_response, query_body) {
      if (!error && query_response.statusCode == 200) {
        query_body = JSON.parse(query_body).featured_linux; //just grab the linux ones XD
        query_body.forEach(function (item) {
          extend(item, { future_price: futurePrice(item.final_price) })
        });
        res.send(query_body);
      }
    });
  });

  //popular games
  app.get('/games/popular', function (req, res) {
    request('http://store.steampowered.com/api/featured/', function (error, query_response, query_body) {
      if (!error && query_response.statusCode == 200) {
        query_body = JSON.parse(query_body).featured_linux; //just grab the linux ones XD
        query_body.forEach(function (item) {
          extend(item, { future_price: futurePrice(item.final_price) });
        });
        res.send(query_body);
      }
    });
  });

  //retrieve a game
  app.get('/game/:gameid', function (req, res) {
    var game = lookupGame(req.params.gameid);
    res.send(game);
  });

  //popular games
  app.get('/games/pricey', function (req, res) {
    request('http://store.steampowered.com/api/featured/', function (error, query_response, query_body) {
      if (!error && query_response.statusCode == 200) {
        query_body = JSON.parse(query_body).featured_linux; //just grab the linux ones XD
        query_body.forEach(function (item) {
          extend(item, { future_price: futurePrice(item.final_price) })
        });
        res.send(query_body);
      }
    });
  });

  //user show
  app.get('/user/:id', function (req, res) {
    var userid = req.params.id;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    // userid is a string. We need it to be a number.
    // Parameters are always strings.
    var useridNumber = parseInt(userid, 10);
    if (fromUser === useridNumber) {
      // Send response.
      res.send(extend(readDocument('users',userid),{id: userid}));
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });

  app.put('/user/:id/watchlist/:appid', function (req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var useridNumber = parseInt(req.params.id, 10);
    if(fromUser==useridNumber) {
      var user = readDocument('users', useridNumber);
      user.watchList.push(parseInt(req.params.appid));
      writeDocument('users', user); //rewrite
      res.send(user); //reply empty status
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });

  app.delete('/user/:id/watchlist/:appid', function (req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var useridNumber = parseInt(req.params.id, 10);
    if(fromUser==useridNumber) {
      var user = readDocument('users', useridNumber);
      var appIndex = user.watchList.indexOf(parseInt(req.params.appid));
      if (appIndex !== -1) {
        user.watchList.splice(appIndex, 1);
        writeDocument('users', user);
      }
      res.send(user); //reply empty status
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });

  // Reset database.
  app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    // This is a debug route, so don't do any validation.
    ResetDatabase(db, function() {
      res.send();
    });
  });

  //work in progress
  app.post('/search/:query', function(req, res){
    var games = [];
    request('http://api.steampowered.com/ISteamApps/GetAppList/v0001/', function (error, query_response, query_body) {
      if (!error && query_response.statusCode == 200) {
        query_body = JSON.parse(query_body).applist.apps.app; //parse
        query_body.forEach(function (item,index){
          if(item.name.toUpperCase().includes(req.params.query.toUpperCase())) {
            var x = { id: item.appid};
            games.push(x);
          }
        });
        res.send(games);
      }
    });
  });

  /**
   * Translate JSON Schema Validation failures into error 400s.
   */
  app.use(function(err, req, res, next) {
    if (err.name === 'JsonSchemaValidation') {
      // Set a bad request http response status
      res.status(400).end();
    } else {
      // It's some other sort of error; pass it to next error middleware handler
      next(err);
    }
  });

  // Starts the server on port 3000!
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});

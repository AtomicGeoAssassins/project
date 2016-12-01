// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
//var util = require("./util.js");
var bodyParser = require('body-parser');
var readDocument = require('./database.js').readDocument;
//var StatusUpdateSchema = require('./schemas/statusupdate.json');
var validate = require('express-jsonschema').validate;
var database = require('./database.js');
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var readEntireDocument = database.readEntireDocument;
app.use(bodyParser.text());
app.use(bodyParser.json());

// You run the server from `server`, so `../client/build` is `server/../client/build`.
// '..' means "go up one directory", so this translates into `client/build`!
app.use(express.static('../client/build'));

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

//---------------------------------Forum Stuff Starts-----------------------------

function postComment(feedItemId, user, contents){
  var comment = {
    "author": user,
    "contents": contents,
    "postDate": new Date().getTime(),
    "likeCounter": []
  };
  var feedItem = doc.readDocument('feedItems', feedItemId);
  feedItem.comments.push(comment);
  writeDocument('feedItems', feedItem);

  return feedItem;
}

app.post('/feeditem/:feedItemId/comment', validate({ body: CommentUpdateSchema}), function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(fromUser === body.userId) {
    var newUpdate = postComment(req.params.feedItemId, body.userId, body.contents);

    res.status(201);
    res.set('/feeditem/' + newUpdate._id);
    res.send(newUpdate);
  } else {
    res.status(401).end();
  }
});

function postStatusUpdate(user, location, contents){
  var time = new Date().getTime();
  var newStatusUpdate = {
    "likeCounter": [], "type": "statusUpdate",
    "contents": {
      "author": user,
      "postDate": time,
      "location": location,
      "contents": contents,
      "likeCounter": []
    },
    "comments": []
  };
  newStatusUpdate = addDocument('feedItems', newStatusUpdate);

  var userData = doc.readDocument('users', user);
  var feedData = doc.readDocument('feeds', userData.feed);
  feedData.contents.unshift(newStatusUpdate._id);
  writeDocument('feeds', feedData);
  return newStatusUpdate;
}

app.post('/feeditem', validate({ body: StatusUpdateSchema}), function(req, res) {
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(fromUser === body.userId) {
    var newUpdate = postStatusUpdate(body.userId, body.location, body.contents);

    res.status(201);
    res.set('Location', '/feeditem/' + newUpdate._id);
    res.send(newUpdate);
  } else {
    res.status(401).end();
  }
});

//---------------------------------Forum Stuff Ends-------------------------------


//games index
app.get('/game', function (req, res) {
  res.send(readEntireDocument('games'));
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
    res.send(readDocument('users',userid));
  } else {
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
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

var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = "db";
// Put the initial mock objects here.
var initialData = {
  "boards": [
    {
      "title": "general",
      "topics": [
        {
          "_id": new ObjectID(),
          "title": "alpacas are smelly",
          "replies": [
            {
              "_id": new ObjectID(),
              "content": "i agree",
              "user_id": new ObjectID(4)
            }
          ]
        }
      ]
    },
    {
      "title": "offtopic",
      "topics": [
        {
          "_id": new ObjectID(),
          "title": "alpacas are smelly",
          "replies": [
            {
              "_id": new ObjectID(),
              "content": "i agree",
              "user_id": new ObjectID(4)
            }
          ]
        }
      ]
    } 
  ],
  "users":{
    "1":
      {
        "_id": new ObjectID(1),
        "userName": "Temp1",
        "bio": "Hi! My name is Temp1!",
        "eMail": "temp1@gmail.com",
        "steamAccount": "tempOne",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "2":
      {
        "_id": new ObjectID(2),
        "userName": "Temp2",
        "bio": "Hi! My name is Temp2!",
        "eMail": "temp2@gmail.com",
        "steamAccount": "tempTwo",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "3":
      {
        "_id": new ObjectID(3),
        "userName": "Temp3",
        "bio": "Hi! My name is Temp3!",
        "eMail": "temp3@gmail.com",
        "steamAccount": "tempThree",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "4":
      {
        "_id": new ObjectID(4),
        "userName": "Temp4",
        "bio": "Hi! My name is Temp4!",
        "eMail": "temp4@gmail.com",
        "steamAccount": "tempFour",
        "companyName": "Team123",
        "watchList": [311210, 504370]
      }
  }
};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;
  
  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }
  
  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}

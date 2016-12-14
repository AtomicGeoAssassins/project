import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "AtomicGeoAssassins";

// Put your mock objects here, as in Workshop 4
var initialData = {
  "games": [
    {
      "_id": 1,
      "title": "Fake Game 1",
      "beforePrice": "59.99",
      "currentPrice": "49.99",
      "futurePrice": "39.99",
      "steamLink": 1
    },
    {
      "_id": 2,
      "title": "Fake Game 2",
      "beforePrice": "9.99",
      "currentPrice": "7.99",
      "futurePrice": "5.99",
      "steamLink": 2
    },
    {
      "_id": 3,
      "title": "Fake Game 3",
      "beforePrice": "19.99",
      "currentPrice": "14.99",
      "futurePrice": "9.99",
      "steamLink": 3
    },
    {
      "_id": 4,
      "title": "Fake Game 4",
      "beforePrice": "14.99",
      "currentPrice": "9.99",
      "futurePrice": "4.99",
      "steamLink": 4
    },
    {
      "_id": 5,
      "title": "Fake Game 5",
      "beforePrice": "3.99",
      "currentPrice": "2.99",
      "futurePrice": "1.99",
      "steamLink": 5
    }
  ],
  "forum": [
    {
      "_id": 1,
      "title": "Jimmy Carter",
      "postTitle": "Welcome",
      "insideData": "Hello, i was one of the presidents, i may be old now but im still effective",
      "comments" :
       [{"Poster": "William Shakespeare", "contents" : "Dummy comment"},
       {"Poster": "William Shakespeare", "contents" : "Dummy comment"},
       {"Poster": "William Shakespeare", "contents" : "Dummy comment"}]
    },
    {
      "_id": 2,
      "title": "Eric Johnson",
      "postTitle": "Workshop 5",
      "insideData": "I dont even know what im doing here",
      "comments" :
       [{"Poster": "William Shakespeare", "contents" : "Dummy comment"},
       {"Poster": "William Shakespeare", "contents" : "Dummy comment"},
       {"Poster": "William Shakespeare", "contents" : "Dummy comment"}]
    },
    {
      "_id": 3,
      "title": "William Shakespeare",
      "postTitle": "New game for sale",
      "insideData": "Selling call of duty modern warfare 7 for 29.99",
      "comments" :
       [{"Poster": "William Shakespeare", "contents" : "Dummy comment"},
       {"Poster": "William Shakespeare", "contents" : "Dummy comment"},
       {"Poster": "William Shakespeare", "contents" : "Dummy comment"}]
    },
    {
      "_id": 4,
      "title": "Theo Cortez",
      "postTitle": "Games page not loading",
      "insideData": "For some reason during the page load, my computer updates from linux to fedora",
      "comments" :
       [{"Poster": "William Shakespeare", "contents" : "Dummy comment"},
       {"Poster": "William Shakespeare", "contents" : "Dummy comment"},
       {"Poster": "William Shakespeare", "contents" : "Dummy comment"}]
    },
    {
      "_id": 5,
      "title": "Tom Peck",
      "postTitle": "I need money",
      "insideData": "Hey I gambled all of my money away",
      "comments" :
       [{"Poster": "William Shakespeare", "contents" : "Dummy comment"},
       {"Poster": "William Shakespeare", "contents" : "Dummy comment"},
       {"Poster": "William Shakespeare", "contents" : "Dummy comment"}]
    }
  ],
  "users":{
    "1":
      {
        "userName": "Temp1",
        "bio": "Hi! My name is Temp1!",
        "eMail": "temp1@gmail.com",
        "steamAccount": "tempOne",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "2":
      {
        "userName": "Temp2",
        "bio": "Hi! My name is Temp2!",
        "eMail": "temp2@gmail.com",
        "steamAccount": "tempTwo",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "3":
      {
        "userName": "Temp3",
        "bio": "Hi! My name is Temp3!",
        "eMail": "temp3@gmail.com",
        "steamAccount": "tempThree",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "4":
      {
        "userName": "Temp4",
        "bio": "Hi! My name is Temp4!",
        "eMail": "temp4@gmail.com",
        "steamAccount": "tempFour",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "5":
      {
        "userName": "Temp5",
        "bio": "Hi! My name is Temp5!",
        "eMail": "temp5@gmail.com",
        "steamAccount": "tempFive",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "6":
      {
        "userName": "Temp6",
        "bio": "Hi! My name is Temp6!",
        "eMail": "temp6@gmail.com",
        "steamAccount": "tempSix",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "7":
      {
        "userName": "Temp7",
        "bio": "Hi! My name is Temp7!",
        "eMail": "temp7@gmail.com",
        "steamAccount": "tempSeven",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "8":
      {
        "userName": "Temp8",
        "bio": "Hi! My name is Temp8!",
        "eMail": "temp8@gmail.com",
        "steamAccount": "tempEight",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "9":
      {
        "userName": "Temp9",
        "bio": "Hi! My name is Temp9!",
        "eMail": "temp9@gmail.com",
        "steamAccount": "tempNine",
        "companyName": "Team123",
        "watchList": [1,2,3]
      },
    "10":
      {
        "userName": "Temp10",
        "bio": "Hi! My name is Temp10!",
        "eMail": "temp10@gmail.com",
        "steamAccount": "tempTen",
        "companyName": "Team123",
        "watchList": [1,2,3]
      }
  }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

export function readEntireDocument(collection) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
* Reset database button.
*/
export class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/resetdb');
        xhr.addEventListener('load', function() {
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
        });
        xhr.send();
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);

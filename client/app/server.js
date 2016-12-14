import {readDocument, readEntireDocument, writeDocument, addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function adjustPrice(price) {
  if(price == null || price == 0) return "Free!";
  price = price.toString();
  return "$" + price.slice(0,price.length-2) + "." + price.slice(price.length-2,price.length);
}

export function setActiveNavLink(page){
  $(document).ready(function () {
    $("#mainNavLinks li.active").removeClass("active"); //first things first remove active from old class
    if(page != "")
      $("#mainNavLinks li").filter(":contains('" + page + "')").addClass("active"); //add to the requested one
  });
  //$("#mainNavLinks li.active").removeClass("active"); //first things first remove active from old class
  //if(index === 0)
  //$("#mainNavLinks li:nth-child(1)").addClass("active"); //add active class to home in this case
  //else
  //$("#mainNavLinks li:nth-child(" + index +")").addClass("active"); //add active class to the caller
}

var token = 'eyJpZCI6NH0='; //this is constant for now
/**
 * Properly configure+send an XMLHttpRequest with error handling,
 * authorization token, and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global AppError */
  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      AppError('Could not ' + verb + " " + resource + ": Received " +
        statusCode + " " + statusText + ": " + responseText);
    }
  });
  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;
  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    AppError('Could not ' + verb + " " + resource +
      ": Could not connect to the server.");
  });
  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    AppError('Could not ' + verb + " " + resource +
      ": Request timed out.");
  });
  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

//----------------------------------Forum Functions Start----------------------------------

export function getFeedItemSync(feedItemId) {
  var feedItem = readDocument('feedItems', feedItemId);
  // Resolve 'like' counter.
  feedItem.likeCounter = feedItem.likeCounter.map((id) => readDocument('users', id));
  // Assuming a StatusUpdate. If we had other types of FeedItems in the DB, we would
  // need to check the type and have logic for each type.
  feedItem.contents.author = readDocument('users', feedItem.contents.author);
  // Resolve comment author.
  feedItem.comments.forEach((comment) => {
    comment.author = readDocument('users', comment.author);
  });
  return feedItem;
}

/**
 * Emulates a REST call to get the feed data for a particular user.
 */
export function getFeedData(user, cb) {
  sendXHR('GET', '/user/4/feed', undefined, (xhr) => {
  // Call the callback with the data.
  cb(JSON.parse(xhr.responseText));
});
}

/**
 * Adds a new status update to the database.
 */
export function postStatusUpdate(user, location, contents, cb) {
  sendXHR('POST', '/feeditem', {
    userId: user,
    location: location,
    contents: contents
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Adds a new comment to the database on the given feed item.
 */
export function postComment(feedItemId, author, contents, cb) {
  sendXHR('POST', '/feeditem/' + feedItemId +"/comment", {
    userId: author,
    contents: contents
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  })
}

/**
 * Updates the text in a feed item (assumes a status update)
 */
export function updateFeedItemText(feedItemId, newContent, cb) {
  sendXHR('PUT', '/feeditem/' + feedItemId + '/content', newContent, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Deletes a feed item.
 */
 export function deleteFeedItem(feedItemId, cb) {
   sendXHR('DELETE', '/feeditem/' + feedItemId, undefined, () => {
     cb();
   });
 }


//----------------------------------Forum Functions End------------------------------------

function useCB(xhr,cb) {
  cb(JSON.parse(xhr.responseText));
}

export function getGameData(cb) {
  sendXHR('GET', '/games', undefined, (xhr) => { useCB(xhr,cb) });
}

export function getGameById(id,cb) {
  sendXHR('GET', '/game/'+id, undefined, (xhr) => { useCB(xhr,cb) });
}

export function getPopularGameData(cb) {
  sendXHR('GET', '/games/popular', undefined, (xhr) => { useCB(xhr,cb) });
}

export function getPriceyGameData(cb) {
  sendXHR('GET', '/games/pricey', undefined, (xhr) => { useCB(xhr,cb) });
}

export function postSearchGameData(cb,query) {
  sendXHR('POST', '/search/'+query, undefined, (xhr) => { useCB(xhr,cb) });
}

export function searchForFeedItems(userID, queryText, cb) {
  // userID is not needed; it's included in the JSON web token.
  sendXHR('POST', '/search',JSON.stringify({query: queryText}), (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getUserData(userID, cb) {
  sendXHR('GET', '/user/'+userID, undefined, (xhr) => { useCB(xhr,cb) });
}

export function getForumBoards(cb) {
  sendXHR('GET', '/forum/boards', undefined, (xhr) => { useCB(xhr,cb) });
}

export function getTopics(boardId,cb) {
  sendXHR('GET', '/forum/topics/'+boardId, undefined, (xhr) => { useCB(xhr,cb) });
}

export function unwatchGame(userid,appid,cb) {
  sendXHR('DELETE', '/user/'+userid+'/watchlist/'+appid, undefined, (xhr) => { useCB(xhr,cb) });
}

export function watchGame(userid,appid,cb) {
  sendXHR('PUT', '/user/'+userid+'/watchlist/'+appid, undefined, (xhr) => { useCB(xhr,cb) });
}

//export function getUserData(cb) {
//var userData = readEntireDocument('users');
//emulateServerReturn(userData, cb);
//}

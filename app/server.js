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

export function setActiveNavLink(page){
  $(document).ready(function () {
    $("#mainNavLinks li.active").removeClass("active"); //first things first remove active from old class
    $("#mainNavLinks li").filter(":contains('" + page + "')").addClass("active"); //add to the requested one
  });
  //$("#mainNavLinks li.active").removeClass("active"); //first things first remove active from old class
  //if(index === 0)
    //$("#mainNavLinks li:nth-child(1)").addClass("active"); //add active class to home in this case
  //else
    //$("#mainNavLinks li:nth-child(" + index +")").addClass("active"); //add active class to the caller
}

export function getGameData(cb) {
  var gameData = readEntireDocument('games');
  emulateServerReturn(gameData, cb);
}

export function getUserData(userID, cb) {
  var userData = readDocument('users', userID);
  emulateServerReturn(userData, cb);
}

export function getForumData(cb) {
  var forumData = readEntireDocument('forum');
  emulateServerReturn(forumData, cb);
}

export function getUserData(cb) {
  var userData = readEntireDocument('users');
  emulateServerReturn(userData, cb);
}

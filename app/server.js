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

export function getGameData(cb) {
  var gameData = readEntireDocument('games');
  emulateServerReturn(gameData, cb);
}

export function getForumData(cb) {
  var forumData = readEntireDocument('forum');
  emulateServerReturn(forumData, cb);
}

export function getUserData(cb) {
  var userData = readEntireDocument('users');
  emulateServerReturn(userData, cb);
}

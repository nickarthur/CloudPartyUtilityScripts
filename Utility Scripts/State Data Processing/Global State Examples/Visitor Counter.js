// Simple visitor counter script
// Phate Shepherd v1.0
// Use a different key parameter for each island you wish to track, or
// you can use the same key for multiple islands if you want combined
// stats.
// Best to place in the center of an island. It may miss visitors on the corners of a 500x500
// island. I would not recommend placing multiple copies of this script on the same island
// as you will get inflated results.

var theEnts = {};
var visitors = [];

function init(){
  if (getParam('Key') === undefined){
    say('Error: No key has been assigned to this visitor counter.');
  } else {
    setStateKeyDefault('Key');
    // Start a timer to scan periodically
    timerCreate({name: 'scan', delay: 5, period: 5});
    // Get the previous saved list of visitors
    getGlobalState({keys: ['visitors'], callback: 'updateVisitors'});
  }

  handlerCreate( {name: 'display', channel: 'direct', message: 'clickStart'} );
}

function scan(){
  getEnts({
    callback_done: 'entsFound',
    radius: 250,
    channel: 'player',
    fields: ['display_name','owner_user']
  });
}

function entsFound() {
  var ent;

  // Update last time each ent has been seen
  for(ent in context.data.ents) {
    // Ignore the owner of the counter.
    if (context.data.ents[ent].owner_user !== getOwnerUser()){
      if (theEnts[ent]) {
        // Visitor has already been seen, just update the time
        theEnts[ent].time = now();
      } else {
        // This visitor has not been seen recently
        theEnts[ent] = {time: now()};
        incGlobalState({key: 'count'});
        // Add their name to the list. Read the exisiting saved list just
        // in case there are multiple counters for this key.
        getGlobalState({
          keys: ['visitors'],
          callback: 'updateVisitors',
          callback_data: {add: context.data.ents[ent].display_name}
        });
      }
    }
  }

  // Now clean up all those that have been gone for 5 minutes
  for(ent in theEnts) {
    if (theEnts[ent].time < (now() - 300000)) delete theEnts[ent];
  }
}

function updateVisitors(){
  // If we already have a saved list of visitors, load them
  if (context.data.visitors) visitors = context.data.visitors;

  // If we have a new one to add to the list, add it, and save to persistant storage
  if (context.data.add){
    // Only keep track of the last 10 visitors
    if (visitors.push(context.data.add) > 10) visitors.shift();
    setGlobalState({data: {visitors: visitors}});
  }
}

function display() {
  if (getParam('Key') === undefined){
      tell({ent: getMessageEnt(), message: 'You must create a Key in your library, and assign it to the customizer in this script before the visitor counter can be used. Each key must be unique to the island(s) you wish to track.'});
  } else {
    getGlobalState({
      keys: ['count', 'visitors'],
      callback: 'doDisplay',
      callback_data: {messageEnt: getMessageEnt()}
    });
  }
}

function doDisplay() {
  var i, message = '\n=== Recent Visitors ===';

  for (i in context.data.visitors){
    message += '\n' + context.data.visitors[i];
  }
  message += '\n=== Visitor count: ' + context.data.count + ' ===';
  tell({ent: context.data.messageEnt, message: message});
}

init();

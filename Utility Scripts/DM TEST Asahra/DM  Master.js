var gameObjects = {};
var trackedAssetCount = getParam('Tracked Asset Count');

var running = false;
var retry;


function getGameObjects(globalStateData) {
  //error('In getAssets: globalStateData = ' + stringify(globalStateData, { newline: false, indent: false }));
  //error('In getAssets: TOTAL TRACKED ASSETS SETTING = ' + trackedAssetCount);
  error('GetGameObjects: TOTAL ASSETS FOUND IS: ' +keys(gameObjects).length);
  gameObjects = globalStateData.gameObjects;

  if (globalStateData.polled) {
    if (keys(gameObjects).length < trackedAssetCount) {
      error('getGameObjects: All assets don\'t exist. Continuing to poll...');
      pollEntity();
    } else {
      timerDestroy('pollEntity');
      error('getGameObjects: All entities found. Everything seems good.');
    }
  }
}

function pollEntity() {
  error('assets{} length = ' + keys(gameObjects).length);
  //error('Polling Global State...');

  getGlobalState({
    state_key: 'DM Key',
    keys: ['gameObjects'],
    callback: 'getGameObjects',
    callback_data: { polled: true }
  });
}

function checkTaskResponse(messageData) {
  //error('checkTaskResponse: messageData = ' + stringify(messageData, { newline: false, indent: false }));

  if (messageData.err !== undefined) {

    //error('checkTaskResponse: We have an error messageData = ' + stringify(messageData, { newline: false, indent: false }));
    purgeAssetFromDB(messageData.name);


    //error('checkTaskResponse: Starting timer for polled broadcast...');
    timerCreate({ name: 'pollEntity', period: 4 });

  } else {
    timerDestroy('pollEntity');
    error('checkTaskResponse: Entity was found. Everything seems good.');
  }
}

function purgeAssetFromDB(assetName){
  //error('In purgeAssetsFromDB: gameObjects = ' +  stringify(gameObjects, { newline: false, indent: false }));

  //error("In purgeAssetsFromDB: the property name to be deleted is: " + assetName);

  delete gameObjects[assetName];

  var gameObjectsCopy = clone(gameObjects);

  setGlobalState({
    state_key: 'DM Key',
    data: {gameObjects:gameObjectsCopy}
  });

    setGlobalState({
    state_key: 'DM Key',
    data: {gameObjects:gameObjectsCopy}
  });

    error('Entity ( ' + assetName + ' ) not found. Purged old ID. Putting system into Standby mode.');
    //error('After purging, assets now contains: ' + stringify(gameObjectsCopy, { newline: false, indent: false }));
}

 // Registration..

 function register(data) {

   if ( retry !== true || data.err !== undefined ) {
     getGlobalState({
       state_key: 'DM Key',
       keys: ['gameObjects'],
       callback: 'registerYourself'
     });
   } else {
       //error('Updated with ID: ' + getSelfEnt());//done
   }
 }

 function registerYourself(data) {
   //error('In RegisterYourself:  global state has: ' + stringify(data,{ newline: false, indent: false }));
   gameObjects = data.gameObjects;

   var base_gameObjects = clone(gameObjects);

   if (gameObjects === undefined) {
     gameObjects = { };
   }

   var my_name = getParam('Game Object Name');

   gameObjects[my_name] = getSelfEnt();

   retry = true;
   //error('In RegisterYourself:  SETTING global state TO: ' + stringify(gameObjects,{ newline: false, indent: false }));

   setGlobalState({
     state_key: 'DM Key',
     data: { gameObjects: gameObjects },
     check: { gameObjects: base_gameObjects},
     callback: 'register'
   });
 }

function pingAssets() {
  //error('PING: Getting asset ID\'s from database...');

  getGlobalState({
    state_key: 'DM Key',
    keys: ['gameObjects'],
    callback: 'getGameObjects'
  });
}

function triggerGameTask()
{
  if (gameObjects !== "undefined") {
    //error('IN TRIGGER GAME TASK: ' + stringify(gameObjects, { newline: false, indent: false }));

    var assetNames = keys(gameObjects);

    //error('IN TRIGGER GAME TASK the game object keys are: ' + stringify(assetNames, { newline: false, indent: false }));
    //error('TOTAL ASSETS FOUND = ' + assetNames.length);

    if ( assetNames !== "undefined" && assetNames.length !== 0 ) {
      for ( var i = 0 ;i< assetNames.length;i++) {
        //error('Processing Game Asset: ' + assetNames[i] );
        //error('Direct Messaging '+ assetNames[i] + ' via ID [' +  gameObjects[assetNames[i]] + '] to do a task...');

        directMessage({
          ent: gameObjects[assetNames[i]],
          channel: 'dm_channel',
          message: 'task',
          callback: 'checkTaskResponse',
          callback_data: { name: assetNames[i] }
        });
      }
    }
  }

}

  function clickStart() {
    error('TRIGGERING GAME TASK!');
      triggerGameTask();
  }

  function init() {

  retry = false;

  register({});

  handlerCreate({
    name: 'clickStart',
    channel: 'direct',
    message: 'clickStart'
  });

  error('STARTED!');
 // timerCreate({ name: 'pingAssets', period: 10 });
}

init();
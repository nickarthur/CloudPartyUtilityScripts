
 // Register...

var g_myName = (getParam('Game Object Name') === '') ?     'prefab' + randomInt(1,60000) : getParam('Game Object Name');

//http://wiki.cloudparty.com/wiki/Script_Examples/Scene_Scripts
 // Where are we?

  var retry;

function init(){

  retry = false;

  register({});

  //in case we get purged due to com delays
  timerCreate({name: 'keepAlive', period: 10});

}

function keepAlive() {

     getGlobalState({
       state_key: 'DM Key',
       keys: ['gameObjects'],
       callback: 'reRegister'
     });
}

function reRegister(globalStateData) {

  var keysArray = keys(globalStateData.gameObjects);


  //if my name isn't on the list then re-register, controller purged me
  if ( keysArray !== "undefined" && keysArray.length>0 ) {
    if ( keysArray.indexOf(g_myName) == -1 ) {
      error('CONTROLLER PURGED ME!  RE-REGISTERING: ' + g_myName + ' as : ' + globalStateData.gameObjects[g_myName]);
      retry = false;
      register({});
    }

  }

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
       error('Updated with ID: ' + getSelfEnt());//done
   }
 }

 function registerYourself(data) {

   var gameObjects = data.gameObjects;

   var base_gameObjects = clone(gameObjects);

   if (gameObjects === undefined) {
     gameObjects = { };
   }



   gameObjects[g_myName] = getSelfEnt();

   retry = true;

   setGlobalState({
     state_key: 'DM Key',
     data: { gameObjects: gameObjects },
     check: { gameObjects: base_gameObjects},
     callback: 'register'
   });
 }

 init();
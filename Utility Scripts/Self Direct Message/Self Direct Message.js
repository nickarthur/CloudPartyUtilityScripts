//an entity can directi message it self using getSelfEnt();
//in that way it can message other handlers in script files attached to itself

//this will allow a game controller to send one direct message to a game asset's dispatcher/watchdog script
//which will determine what behaviour scripts attacted to the game object to trigger via self-direct messages.

//this would allow an object ot offer multiple services to clients through one interface (the dispatecher)
//the dispatcher must be aware of the scripts added to its game asset and how to trigger them (i.e. the message channel, and payload)

//the channel could be   "self"+getSelfEnt()
//the message could be doTweenColor
//the payload could be   data: { delay:2,duration: 5, color-start:red, color-end:blue}

//DispatcherCommandChannel-- the dispatcher will listen for direct messages on the dispatcher command channel.
// so a game controller or other object can send one or more commands to trigger behaviors which will in turn trigger
// multiple scripts that are composed to create complex behavioral response (e.g.   do a motion twwen, flash a particle script, play a sound, move, or scale
//each behaviour is triggered by the dispatcher control logic.  perhaps a case statement that switched on command types.

//COMMANDS:  uberFlash,  soundOnly, soundNColor.  -- these commands are sent by the gamecontroller to specific registered
//gameAssets that have the dispatcher script and behaviour scripts attached.

var isPaused = getParam('Pause');

if (isPaused === undefined){
  isPaused = false;
  customizerSet({name: 'Pause', value: isPaused});
  error('self direct: is Paused was undefined but now is == ' + getParam('Pause'));
  //say('self direct: is Paused was undefined but now is == ' + getParam('Pause'));
}


function click(data) {
  directMessage({ ent: getSelfEnt(), channel: 'test', message: 'go', data: 'foo' , callback: 'messageCallback'});
  //toggle paused state
  isPaused = !isPaused;
  error('self direct click: is Paused == ' + isPaused);
  customizerSet({name: 'Pause', value: isPaused});
}

function messageCallback(callbackData){
  error('THE CALLBACK DATA IS: ' + stringify(callbackData));
}

handlerCreate({
  name: 'click',
  channel: 'direct',
  message: 'clickStart'
});
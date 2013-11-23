// Scene Director

//http://wiki.cloudparty.com/wiki/Script_Examples/Scene_Scripts/Director

/*
Script Examples/Scene Scripts/Director
This script makes players do things during a scene.
It's fairly fragile as the player is able to interrupt the actions it tells them to take by simply moving.
Due to the security system, it'll probably only work if you own the land you place it on.
*/

/*
Parameters and Customizers

Delay (Number)
This is how long, in seconds, after the scene starts that the action should be requested. Note that at the begining of a scene
it is quite likely that a player is still moving and will thus override any early movement instructions.

Marker (String)
The name of the marker on the object the script is attached to that the player should move to. Once they get there they
will do whatever animation the marker is coded to make them play.

Detatch Delay (Number)
This is how long, in seconds, after the player is told to perform the action that they should be detatched from the object that's
hosting the script. If you don't want them detatched, code a value of -1. Why detatch them? Because if you don't and the object
moves they will get dragged along with it - even if they are no longer onboard.
Execution

When the scene start signal arrives it sets up a timer to scedule the action. The action is simply passed onto
the player and then another timer may be set up for the detatch, if one is needed.

Notes

None.
*/


var scene_controller;

var delay = getParam('Delay');

var marker = getParam('Marker');

var detach_delay = getParam('Detach Delay');

// Start thinks happening

handlerCreate( { name: 'movePlayer',
              channel: 'SceneControl',
              message: 'start',
               script: 'movePlayer' });

function movePlayer(event) {

  if (delay === 0) {
    doMovePlayer(event);
  } else {
    timerCreate({ name: 'doMovePlayer', script:'doMovePlayer', delay: delay, data: event });
  }
}

function doMovePlayer(event) {

  animClickMarker( { marker_id: marker, ent: event.ent });

  if (detach_delay === 0) {
    doDetach(event);
  } else if (detach_delay > 0) {
    timerCreate({ name: 'doDetach', script:'doDetach', delay: detach_delay, data: event });
  }
}
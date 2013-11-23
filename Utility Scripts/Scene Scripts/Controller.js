// Scene Controller

//http://wiki.cloudparty.com/wiki/Script_Examples/Scene_Scripts

/*
Paramters and Customizers

Draft Key (Key)
The Draft Key is simply a key that you have created in the builder. Give it a name that reflects the scene. It will be used to manage the cast in the Draft version of your build.
All objects in the scene must specify the same Draft key value on the Registration calls.

Published Key (Key)
The Published Key is simply a key that you have created in the builder. Give it a name that reflects the scene. It will be used to manage the cast in the Published version of your build.
All objects in the scene must specify the same Published key value on the Registration calls.

Duration (Number)
The expected duration of the scene in Seconds.
Once started, the scene will not restart until the duration has passed and the end scene events have been generated (unless you reset the scene controller object, but this isn't a good idea as the other objects in the scene may be half way through whatever they are meant to be doing).
Execution

When the script initializes it sets up a 5 second timer to monitor the cast list for the scene (see the Register script for more details).
When a player enters the collision volume of the controller object it catches the event, sends a start message to each member of the cast and sets up a timer for the end of the scene.
When the end of scene timer pops it sends a stop message to each cast member.
Notes

If the scene controller object is going to host any other scene functions (sounds or direction) it needs to have the Scene Register script on it as well.
*/



  var playing = false;

  var duration = getParam('Duration');

  var actors = [];

  var cast;

  getBuildFields( { build: getBuild(),
                 callback: 'buildInfo',
                   fields: [ 'display_name', 'description', 'published' ] } );

  function buildInfo(buildData) {

   // Register an object with the Scene Controller...

    if (buildData.published == 1) {
       setStateKeyDefault('Published Key');
    } else {
       setStateKeyDefault('Draft Key');
    }

    timerCreate({ name: 'monitorCast', script: 'getActors', period: 5 });

 }

 function getActors() {

   getGlobalState({ keys: ['cast'],
                callback: 'updateCast' });
 }

 function updateCast(data) {

   cast = data.cast;

   if (cast !== undefined) {

     var i;

     var cast_keys = keys(cast);

     var actor;

     actors = [];

     for (i = 0; i < cast_keys.length; i++) {
       actor = cast_keys[i];
       actors.push(cast[actor]);
     }
   }
 }

 handlerCreate( { name: 'startScene',
               channel: 'physics',
               message: 'collisionStart',
                script: 'startScene' });

 function startScene(event) {

   var i;

   if (playing === false) {

     playing = true;

     if (actors.length > 0) {

       directMessage({ ents: actors,
                    channel: 'SceneControl',
                    message:'start',
                       data: { ent: event.from_ent}});
     }

     timerCreate({ name: 'finish', script: 'finish', delay: duration, data: event});
   }
 }

 function finish(event) {

   if (playing === true) {
     playing = false;
     directMessage({ ents: actors,
                  channel: 'SceneControl',
                  message: 'stop',
                     data: { ent: event.from_ent }});
   }
 }
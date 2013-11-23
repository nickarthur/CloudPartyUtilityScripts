// Scene Fade

//http://wiki.cloudparty.com/wiki/Script_Examples/Scene_Scripts/Fade

/*
Parameters and Customizers

Initially Hidden (Bool)
Set to true if the object is initially invisible and should appear at the start of the scene. Set to false if the object is initially visible and should disappear during the scene.

Delay (Number)
The time, in seconds, after the start of the scene when the fade affect should be applied. It will automatically be reversed at the end of the scene.

Setup

In addition to having the script linked, the object must have a Customizer called Fade upon it that is a Bool and is tied to the hidden flag on the objects mesh.
If the object has multiple meshes you may be able to tie them to the output of the same customizer.
Execution

When the scene start signal arrives, the delay is checked. If it is 0 the objects visability is toggled immedietly, if it is not, a timer is set up to toggle it.
When the scene end signal arrives, the object visibility is toggled again.
Notes

None.
*/

 var initially_hidden = getParam('Initially Hidden');

 var delay = getParam('Delay');

 if (initially_hidden === true) {
   customizerSet({name: 'Fade', value: true });
 } else {
   customizerSet({name: 'Fade', value: false });
 }

 handlerCreate( { name: 'reveal',
               channel: 'SceneControl',
               message: 'start',
                script: 'reveal' });

 var revealed = false;
//http://wiki.cloudparty.com/wiki/Script_Examples/Scene_Scripts/Fade

//http://wiki.cloudparty.com/wiki/Script_Examples/Scene_Scripts
 function reveal(event) {

   if (delay === 0) {
     doReveal(event);
   } else {
     timerCreate({ name: 'doReveal', script: 'doReveal', delay: delay, data: event });
   }
 }

 function doReveal(event) {

   if (revealed === false) {
     revealed = true;
     if (initially_hidden === true) {
       customizerSet({name: 'Fade', value: false });
     } else {
       customizerSet({name: 'Fade', value: true });
     }
   }
 }

 handlerCreate( { name: 'conceal',
               channel: 'SceneControl',
               message: 'stop',
                script: 'conceal' });

 function conceal(event) {

  if (revealed === true) {
    revealed = false;
    if (initially_hidden === true) {
      customizerSet({name: 'Fade', value: true });
    } else {
      customizerSet({name: 'Fade', value: false });
    }
  }
 }
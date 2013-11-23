// Scene Sound


//http://wiki.cloudparty.com/wiki/Script_Examples/Scene_Scripts/Sound

/*
Parameters and Customizers

Delay (Number)
The time, in seconds, after the scene starts that the sound should start playing.

Sound (Sound)
The sound clip to be played.

Full Vomune (Number)
The distance, in meters, from the object at which the sound can be heard at full volume.

Drop Off (Number)
The distance, in meters, the sound takes to drop to 0 volume once outside the Full Volume range.

Volume (Number)
The gain applied to the sound - 0.0 is silent, 0.1 is quiet, 0.3-1.0 sounds pretty much the same.
*/

var delay = getParam('Delay');

var min = getParam('Full Volume');
var max = min + getParam('Drop Off');

// Start the sound track

handlerCreate( { name: 'playSound',
              channel: 'SceneControl',
              message: 'start',
               script: 'playSound' });

var playing = false;

function playSound() {

  if (playing === true) {
    playing = false;
    soundStop('Sound');
  }

  playing = true;

  if (delay === 0) {
    doPlaySound();
  } else {
    timerCreate({ name: 'doPlaySound', script:'doPlaySound', delay: delay });
  }
}

function doPlaySound() {

  soundStart( { sound: 'Sound',
               handle: 'Sound',
              details: { loop: false,
                 min_distance: min,
                 max_distance: max,
                         gain: getParam('Volume'),
                          pan: false }
              });
}

handlerCreate( { name: 'endSound',
              channel: 'SceneControl',
              message: 'stop',
               script: 'endSound' });

function endSound(event) {

  if (playing === true) {
    playing = false;
    soundStop('Sound');
  }
}
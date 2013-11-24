function animPlayDelayed() {
  animPlay(context.data);
}

function foundPlayer() {
  var playerEnt = context.data.ent;

  //if (!get(playerEnt)) {
    animAddSequencer({ ent: playerEnt, sequencer: 'disco'});
    set(playerEnt, true);
  //}

  var animation = 'fever';
  if (randomInt(0,1) === 0) {
    animation = 'hips';
  }

  timerCreate({
    name: 'animPlayDelayed' + playerEnt,
    script: 'animPlayDelayed',
    delay: 0.75,
    data: {
      ent: playerEnt,
      keyword: animation
    }
  });
}
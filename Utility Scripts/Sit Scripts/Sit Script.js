// SITTING from a script is possible right now, but a bit hacky.

function animPlayDelayed() {
  // Play back the animation on the player.
  animPlay(context.data);
}

function playAnimation() {

  // Get the position of the chair so you can set the player there.
  var p = getPos();

  // Position the user at the chair, so they look right doing the animation.
  // This is a big hack for now. They are working on marker tech that will make
  // positioning the player easier.
  setPosRot({
    pos: [p[0], p[1], p[2] + 0.39],
    rot: getRot(),
    ent: getMessageEnt()
  });

  // Push a sequencer onto the person who clicked. You need to set up a param
  // in the script with the green + icon to point to your sequencer.
  animAddSequencer({ ent: getMessageEnt(), sequencer: 'sit', duration: 1.5 });

  // This timer is a tempoprary hack. You won't need this once the bug is
  // fixed, but for now you have to delay the animation to make sure that
  // it doesn't trigger before the sequencer arrives.
  timerCreate({
    name: 'animPlayDelayed',
    delay: 0.75,
    data: {
      ent: getMessageEnt(),
      keyword: 'sit'
    }
  });
}

// Set it up so that a click will trigger a sitting animation.
handlerCreate({
  name: 'playAnimation',
  channel: 'direct',
  message: 'clickStart'
});
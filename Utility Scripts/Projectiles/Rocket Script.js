function explode() {
  particleFlash({particle:'Explosion', details:{detach: true, ignore_rotation: true}});
  particleStop({handle:'trail'});
  soundFlash({sound:'Boom', details: {detach: true, ref_distance:300, travel_delay: true}});
  reset();
}

function accelerate() {
  var new_vel = getVelLinear();
  var accel = [0,0,6];
  vecPosRotate(accel, getRot());
  vecAdd(new_vel, accel);
  setVelLinear({vel: new_vel, world: true});
}

function launch() {
  soundFlash({sound:'LaunchSound', details: {ref_distance:100}});
  particleStart({handle: 'trail', particle:'Trail'});
  setVelLinear({vel: [0,0,40]});
  timerCreate({
    delay: 0.2,
    period: 0.2,
    name: 'accelerate'
  });
  timerCreate({
    delay: 3,
    name: 'explode'
  });
}

handlerCreate({
  name: 'launch',
  channel: 'direct',
  message: 'clickStart'
});
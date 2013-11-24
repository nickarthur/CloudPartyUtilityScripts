function cleanup() {
  // Reset the cannonball (destroying it)
  reset({ent:context.data.to_clean});
}

// Called once the cannonball is spawned
function cannonballCreated() {
  // Create a timer which, after 20 seconds, calls cleanup()
  // passing in the created cannonball entity uid
  timerCreate({
    script: 'cleanup',
    delay: 360.0,
    data: {to_clean: context.data.ent}
  });
}

// Gets called when cannon is clicked
function fire() {
  // Check the time it was last fired for cooldown check
  var last = get('last_fired');
  // If it has been less than 2000 milliseconds (2 seconds), abort
  if (now() - last < 10000) {
    return;
  }
  // Record current time for cooldown check
  set('last_fired', now());

  // The up-vector (0,0,1) of the Barrel marker is pointed down the cannon barrel, at the tip
  var barrel_forward = [0,0,1];
  vecPosRotate(barrel_forward, getMarkerRot('Barrel'));

  // Play the sound set in the parameter Boom, with a reference distance of 100 meters
  soundFlash({sound:'Boom', details:{ref_distance:100}});
  // Create the gun smoke
  particleFlash({
    particle:'GunSmoke',
    details:{attach:'Barrel'}
  });
  particleFlash({
    particle:'GunSmoke2',
    details:{attach:'Barrel'}
  });


  // Massage force start position to capture more projectiles
  var force_start = getMarkerPos('Barrel');
  force_start[1] -= 0.5;
  force_start[2] -= 0.5;

  // Apply an impulse to all physical objects in front of cannon
  applyImpulseFrom({
    radius: 5,
    mag: 200,
    dir: barrel_forward,
    pos: force_start
  });

  // Spawn a cannonball, at the marker 'Barrel' which is on the cannon object.
  // Call cannonballCreated when the cannonball is spawned
  var launch_velocity = vecDup(barrel_forward);
  vecMulScalar(launch_velocity, 15);
  spawn({
    object:'Cannonball',
    pos:getMarkerPos('Barrel'),
    linear:launch_velocity,
    callback:'cannonballCreated'
  });
}

handlerCreate({
  name: 'fire',
  channel: 'direct',
  message: 'clickStart'
});
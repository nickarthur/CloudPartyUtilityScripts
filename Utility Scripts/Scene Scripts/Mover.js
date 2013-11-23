

// Scene Mover
http://wiki.cloudparty.com/wiki/Script_Examples/Scene_Scripts/Mover

/*
Script Examples/Scene Scripts/Mover

The Mover script makes an object move along a pre-defined movement path.
The waypoints marking the movement path are named according to the formula

MOVE ss ddd vvv

ss is a unique value, often used to hold a sequence number - however the waypoints are visited in the order they are listed.

ddd is the dwell time for the waypoint - how long the object will wait before moving onto the next waypoint. 0 is no delay.

vvv is the velocity with which the object moves to the next waypoint. If omitted it defaults to the velocity specified as a parameter.

The position of the waypoints is recorded at the objects start position and those are the locations that are visited.

The objects start position forms the 0th marker and is where the object will return to at the end of the cycle.

Timing wise, you need to ensure that the object is back at it's starting position before the controller declares that the
scene is over as it may not play back right if the object doesn't start from the correct place.
*/


/*
Parameters and Customizers

Delay (Number)
The time, in seconds, after the scene begins to wait before starting the movement.
Velocity (Number)
The speed, in m/s, that the object will move at. The object moves forwards along it's Y positive axis.
Keep Level (Bool)
If true the objects rotation around the X axis will be suppressed.
Execution

When the script is initialized it grabs the location of all of the MOVE waypoints and stashes them in an internal object.
When the signal to start the scene occurs it waits it's delay and then starts moving the object.
When it runs out of waypoints it returns to its start position and then stops moving.
Notes

This is a tad fragile, but works if you don't ask to much of it.
*/


var scene_controller;

var delay = getParam('Delay');

var vel = getParam('Velocity');

var cur_vel = vel;

var level = getParam('Keep Level');

// Build up my motion path in an array...

var markers = getMarkerIDs();
var marker;

var waypoints = [];
var waypoint = { name: 'BASE', pos: getPos(), rot: getRot(), dwell: -1, vel: vel };

waypoints.push(clone(waypoint));

var i;

for (i = 0; i < markers.length; i++) {

  marker = markers[i];

  if (marker.substr(0,5) === 'MOVE ') {

    waypoint.name = marker;

    waypoint.pos = getMarkerPosWorld(marker);
    waypoint.rot = getMarkerRotWorld(marker);

    waypoint.dwell = parseInt(marker.substr(7,3), 10);

    waypoint.vel = parseInt(marker.substr(11,3), 10);

    if (isNaN(waypoint.vel)) {
      waypoint.vel = vel;
    }

    waypoints.push(clone(waypoint));
  }
}

var target = -1;
var countdown = -1;

// Start things happening...

handlerCreate( { name: 'moveMe',
              channel: 'SceneControl',
              message: 'start',
               script: 'moveMe' });

function moveMe(event) {

  target = -1;

  if (delay === 0) {
    doMoveMe(event);
  } else {
    timerCreate({ name: 'doMoveMe', script:'doMoveMe', delay: delay, data: event });
  }
}

// Once aropund the block...

function doMoveMe(event) {

  // Initialize?

  if (target === -1) {
    timerCreate({ name: 'doMoveMe', script:'doMoveMe', period: 0.5, data: event });
    target = 0;
    countdown = 0;
  }

  // Dwell the hard way...

  if (countdown > 0) {
    countdown -= 1;
    return;
  }

  // Time to go?

  if (countdown === 0) {
    target += 1;

    if (target === waypoints.length) {
      target = 0;

    }

    countdown = -1;
  }

  // Where am I going?

  waypoint = waypoints[target];

  // We there yet?

  var pos = getPos();
  var rot = getRot();
  var dist = vecDistance(pos, waypoint.pos);

  if ( dist < vel/2 ) {

    if (level === true) {
      setPosRot({pos: waypoint.pos, rot: [0, 0, waypoint.rot[2]]});
    } else {
      setPosRot({pos: waypoint.pos, rot: waypoint.rot});
    }
    setVelAngular({ vel: [0, 0, 0]});
    setVelLinear({ vel: [0, 0, 0]});

    cur_vel = waypoint.vel;

    if (target === 0) {
      timerDestroy('doMoveMe');
      return;
    } else {
      countdown = waypoint.dwell * 2;
      doMoveMe();
    }
  } else {

    // Calculate simple linear movement...

      var delta_pos = vecDup(waypoint.pos);
      vecSub(delta_pos,pos);
      vecNormalize(delta_pos);
      vecMulScalar(delta_pos, abs(cur_vel));

    // Calculate rotational movement...

      var delta_rot = vecDup(waypoint.rot);
      vecSub(delta_rot, rot);

      if (delta_rot[0] > 180) {
        delta_rot[0] -= 360;
      } else if (delta_rot[0] < -180) {
        delta_rot[0] += 180;
      }

      if (delta_rot[1] > 180) {
        delta_rot[1] -= 360;
      } else if (delta_rot[1] < -180) {
        delta_rot[1] += 180;
      }

      if (delta_rot[2] > 180) {
        delta_rot[2] -= 360;
      } else if (delta_rot[2] < -180) {
        delta_rot[2] += 180;
      }

    // Cancel some rotation if they want it level...

      if (level === true) {
        delta_rot[0] = 0;
        delta_rot[1] = 0;
      }

    // Apply...

      setVelAngular({vel: delta_rot});
      setVelLinear({vel: delta_pos, world: true});
  }
}


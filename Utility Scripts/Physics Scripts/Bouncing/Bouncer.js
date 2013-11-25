// Are we currently bouncing? Allow a bounce to finish before bouncing again.
var bouncing = false;

// Velocity
var vel = 4;

// Velocity maximum
var velMax = 4;

// Acceleration of speed over time
var accel = 1;

var entity = '';

// Push downward
function pushDown() {
  vel = (vel > 0) ? vel - accel : 0;
  setVelLinear({vel: [0, 0, -vel], world: false});
  if (vel <= 0) {
    timerDestroy('pushDown');
    timerCreate({name: 'pushUp', period: 0.1});
  }
}

// Push upward
function pushUp() {
  vel = (vel < velMax) ? vel + accel : velMax;
  setVelLinear({vel: [0, 0, vel], world: false});
  if (vel >= velMax) {
    setVelLinear({vel: [0, 0, 0], world: false});
    bouncing = false;
    applyImpulse({
      impulse: [0, 0, 40],
      ent: entity
    });
    timerDestroy('pushUp');
  }
}

function onCollide(data) {
  entity = data.from_ent;
  if (!bouncing) {
    bouncing = true;
    timerCreate({name: 'pushDown', period: 0.1});
  }
}

handlerCreate({
  name: 'onCollide',
  channel: 'physics',
  message: 'collisionStart'
});
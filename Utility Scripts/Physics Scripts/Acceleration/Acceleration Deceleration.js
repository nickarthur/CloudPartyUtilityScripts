// Velocity
var vel = 0;

// Velocity maximum
var velMax = 10;

// Acceleration of speed over time
var accel = 0.5;

// Accelerate
function accelerate() {
  vel = (vel < velMax) ? vel + accel : velMax;
  setVelLinear({vel: [0, vel, 0], world: false});
  if (vel >= velMax) timerDestroy('accelerate');
}

// Decelerate
function decelerate() {
  vel = (vel > 0) ? vel - accel : 0;
  setVelLinear({vel: [0, vel, 0], world: false});
  if (vel <= 0) timerDestroy('decelerate');
}

// Example #1 - Acceleration
//vel = 0; // Assume there is no velocity
//timerCreate({name: 'accelerate', period: 0.1});

// Example #2 - Deceleration
vel = 10; // Assume there is a velocity of 10
timerCreate({name: 'decelerate', period: 0.1});
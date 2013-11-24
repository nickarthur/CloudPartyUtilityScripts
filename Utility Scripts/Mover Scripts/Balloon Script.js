function changeDirection() {
  var v = get('velocity');
  var vz = get('vz');
  setVelLinear({vel:[(random() * v) -(v/2), (random() * v) -(v/2), (random() * vz) - (vz / 2)]});
}

function checkBounds() {

  // See if the balloon is outside its teather radius. If so,
  // direct it back towards its origin.
  var teather = get('teather');
  var p1 = getPos();
  var p0 = vecDup(get('initialPos'));

  vecSub(p0, p1);
  var d = vecLength(p0);
  if (d > teather) {
    vecNormalize(p0);
    var v = get('velocity');
    vecMulScalar(p0, v);
    setVelLinear({vel: p0, world: true});
  }
}

function initScript() {
  set('initialPos', getPos());
  set('teather', 50);
  set('velocity', 0.75);
  set('vz', 0.1);

  timerCreate({
    name: 'changeDirectionTimer',
    script: 'changeDirection',
    period: 20
  });

  timerCreate({
   name: 'checkBoundsTimer',
    script: 'checkBounds',
    period: 5
  });

}

call('initScript');
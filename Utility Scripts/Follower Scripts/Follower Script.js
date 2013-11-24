function onClick() {
  set('owner', getMessageEnt());
  timerCreate({
    name: 'followTimer',
    script: 'follow',
    period: 1.0
  });

  timerCreate({
    name: 'stopFollowing',
    script: 'stopFollowing',
    delay: 120
  });
}

function stopFollowing() {
  timerDestroy('stopFollowing');
  timerDestroy('followTimer');
  set('owner', null);
  setVelLinear({
    vel: [0, 0, 0],
    world: false
  });
  animPlay({
    keyword: 'idle'
  });
}

function follow() {
  getEntFields({
    ent: get('owner'),
    fields: ['pos'],
    callback: 'foundOwner'
  });
}


function foundOwner() {
  var ownerPos = context.data.pos;

  // Face the owner
  pointToward({
    pos: ownerPos
  });

  var dsq = vecDistanceSquared(getPos(), ownerPos);

  if (dsq > 6.0) {
    animPlay({
      keyword: 'hop'
    });

    // Go towards owner
    setVelLinear({
      vel: [0, 1.0, 0],
      world: false
    });
  } else {
    animPlay({
      keyword: 'idle'
    });

    particleFlash({
      particle: 'hearts'
    });

    setVelLinear({
      vel: [0, 0, 0]
    });
  }
}

handlerCreate({
  script: 'onClick',
  name: 'onClick',
  channel: 'direct',
  message: 'clickStart'
});
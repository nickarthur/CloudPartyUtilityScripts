// Number of spawns. Value between 1 and 10.
var numberOfSpawns = clamp(getParam('Trunk Spawns'), 1, 10);

// How quickly spawns are created. Value between 0.1 and 10 seconds.
var spawnTime = clamp(getParam('Spawn Time'), 0.1, 10);

// Distance at which spawns are placed from one another.
// Assumes Z-axis. Value between 0.1 and 10 meters.
var spawnDistance = clamp(getParam('Spawn Distance'), 0, 10);

// Track which spawn we're on as they are spawned
var currentNumberOfSpawns = 0;

function spawnTrunk(data) {
  if (currentNumberOfSpawns < numberOfSpawns) {
    spawn({
      prefab: 'Trunk Prefab',
      pos: [0, 0, (spawnDistance * ++currentNumberOfSpawns)]
    });
  } else {
    timerDestroy('spawnTrunk');
  }
}

function spawnTree() {
  // Clean-up the existing spawns
  resetSpawned();

  // Reset spawn counter
  currentNumberOfSpawns = 0;

  // Spawn tree segments
  timerCreate({name: 'spawnTrunk', period: spawnTime});
}

handlerCreate({
  name: 'spawnTree',
  channel: 'direct',
  message: 'clickStart'
});

spawnTree();
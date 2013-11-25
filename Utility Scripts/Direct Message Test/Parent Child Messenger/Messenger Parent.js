// Channel to communicate on
var listenChannel = 'mychannel';

// Custom data to be sent to child
var favoriteColor = 'red';
var favoriteNumber = 7;

// Handler for direct messages from child spawn
function helloHandler() {
  error('PARENT: Got direct message from child');
}

// Handler once child has spawned
function spawnCreated(data) {
  // Handler for direct messages from child
  handlerCreate({
    name: 'helloHandler',
    channel: listenChannel,
    message: 'hello',
    ents: [data.ent]
  });

  // Let's talk back to the child
  directMessage({
    ent: data.ent,
    channel: listenChannel,
    message: 'hello',
    data: {
      channel: listenChannel,
      color: favoriteColor,
      number: favoriteNumber
    }
  });
}

// Remove any previous instance of child spawn before spawning new child
resetSpawned();

// Spawn our child
spawn({
  prefab: 'childName',
  pos: [1, 0, 0],
  created_data: {
    listenChannel: listenChannel,
    favColor: favoriteColor,
    favNumber: favoriteNumber
  },
  callback: 'spawnCreated'
});
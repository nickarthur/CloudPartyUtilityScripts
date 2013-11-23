// Channel to communicate on
// To avoid directly using the global context.data,
// the channel to listen on when spawned is explicitly defined
var listenChannel = 'mychannel';

// Handler for direct messages from parent
function helloHandler(data) {
  listenChannel = data.channel;

  say('CHILD: Got direct message from parent');
  say('CHILD: Parent favorite color is ' + data.color);
  say('CHILD: Parent favorite number is ' + data.number);

  // Let's talk back to the parent now that I've spawned
  directMessage({
    ent: getCreatorEnt(),
    channel: data.channel,
    message: 'hello'
  });
}

// Handler for direct messages from parent
handlerCreate({
  name: 'helloHandler',
  channel: listenChannel,
  message: 'hello',
  ents: [getCreatorEnt()]
});
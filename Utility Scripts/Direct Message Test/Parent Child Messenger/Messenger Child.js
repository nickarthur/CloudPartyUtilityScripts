// Channel to communicate on
var listenChannel = context.data.listenChannel;

// Handler for direct messages from parent
function helloHandler(data) {
  listenChannel = data.channel;

  error('CHILD: Got direct message from parent');
  error('CHILD: Parent favorite color is ' + data.color);
  error('CHILD: Parent favorite number is ' + data.number);

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
function click(data) {
  // Get the name of player who clicked the marker
  // Pass marker info to callback function showInfo()
  // Player name = fields: ['display_name']
  // Marker name = marker: data.marker_id
  getEntFields({
    ent: getMessageEnt(),
    fields: ['display_name'],
    callback: 'showInfo',
    callback_data: {marker: data.marker_id}
  });
}

function showInfo(callback_data) {
  // Player name
  var player = callback_data.display_name;
  // Marker name
  var marker = callback_data.marker;

  // Determine which marker was clicked
  switch(marker) {
    case 'First Marker':
      // First marker was clicked
      say(player + ' clicked the first marker: ' + marker);
      break;
    case 'Second Marker':
      // Second marker was clicked
      say(player + ' clicked the second marker: ' + marker);
      break;
    default:
      // If a different marker was clicked, say the marker name.
      say(player + ' clicked marker "' + marker + '"');
  }
}

handlerCreate({
  name: 'click',
  channel: 'direct',
  message: 'clickStart'
});
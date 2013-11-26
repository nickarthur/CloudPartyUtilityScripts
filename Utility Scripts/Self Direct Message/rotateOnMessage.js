

function rotateOn()
{
  var isPaused = getParam('Pause');
  isPaused = isPaused === undefined?false:isPaused;

  error('GOT COMMAND');
  if(! isPaused)
  {
    error('rotateOn if: is Pausd == ' + isPaused);
    setVelAngular( {vel: [0,0,40], world: false} );
  }
  else
  {
    setVelAngular({vel:[0,0,0],world:false});
    error('rotateOn else: is Pausd == ' + isPaused);
  }
}

handlerCreate({
  channel: 'test',
  message: 'go',
  script: 'rotateOn',
  name: 'rotateOn'
 });


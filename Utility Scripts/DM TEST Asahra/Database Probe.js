//database probe

function clickStart(clickEventData) {
  getGlobalState({
    state_key: 'DM Key',
    keys: ['gameObjects'],
    callback: 'printAssets'
  });
}

function printAssets(globalStateData) {
  error('The assets in the database are: ' + stringify(globalStateData, {newline:false,indent:false }) );

}

function init()
{
  handlerCreate({
    name: 'clickStart',
    channel: 'direct',
    message: 'clickStart'
  });
}

init();

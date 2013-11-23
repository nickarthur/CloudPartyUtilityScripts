//database probe

function clickStart(clickEventData) {
  getGlobalState({
    state_key: 'DM Key',
    keys: ['asset_a_nick', 'asset_b_nick', 'asset_c_nick'],
    callback: 'printAssets',
    callback_data: { greeting:"yo! man"}
  });
}

function printAssets(globalStateData) {
  error('The assets in the database are: ' + stringify(globalStateData, {newline:false,indent:false }) + ' ' + globalStateData.greeting);

}

handlerCreate({
  name: 'clickStart',
  channel: 'direct',
  message: 'clickStart'
});


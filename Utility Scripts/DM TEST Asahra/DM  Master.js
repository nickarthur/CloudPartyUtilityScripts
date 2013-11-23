var gAssetsObj = {};

function updatedData(globalStateData) {
  error('Getting asset ID\'s from database...');

  getGlobalState({
    state_key: 'DM Key',
    keys: ['asset_a_nick','asset_b_nick','asset_c_nick'],
    callback: 'getAssets'
  });
}

function getAssets(globalStateData) {
  error('In getAssets: globalStateData = ' + stringify(globalStateData, { newline: false, indent: false }));
  gAssetsObj = globalStateData;

  if (globalStateData.polled) {
    if (keys(gAssetsObj).length < 3) {
      error('getAssets: All assets don\'t exist. Continuing to poll...');
      pollEntity();
    } else {
      timerDestroy('pollEntity');
      error('getAssets: All entities found. Everything seems good.');
    }
  }
}

function pollEntity() {
  error('assets{} length = ' + keys(gAssetsObj).length);
  error('Polling Global State...');

  getGlobalState({
    state_key: 'DM Key',
    keys: ['asset_a_nick','asset_b_nick','asset_c_nick'],
    callback: 'getAssets',
    callback_data: { polled: true }
  });
}

function checkTaskResponse(messageData) {
  error('messageData = ' + stringify(messageData, { newline: false, indent: false }));

  if (messageData.err !== undefined) {

    purgeAssetFromDB(messageData.name);


    error('Starting timer for polled broadcast...');
    timerCreate({ name: 'pollEntity', period: 4 });

  } else {
    timerDestroy('pollEntity');
    error('Entity was found. Everything seems good.');
  }
}

function purgeAssetFromDB(assetName){
    error('In purgeAssetsFromDB: gAssetsObj = ' +  stringify(gAssetsObj, { newline: false, indent: false }));

  error("In purgeAssetsFromDB: the property name to be deleted is: " + assetName);

   delete gAssetsObj[assetName];

    var assetsObjCopy = clone(gAssetsObj);


    setGlobalState({
    state_key: 'DM Key',
    data: {asset_a_nick:'jello' }
  });

    setGlobalState({
    state_key: 'DM Key',
    data: assetsObjCopy
  });

    error('Entity ( ' + assetName + ' ) not found. Purged old ID. Putting system into Standby mode.');
    error('After purging, assets now contains: ' + stringify(assetsObjCopy, { newline: false, indent: false }));
}

function clickStart() {
  error('Direct Messaging asset_a_nick via ID [' + gAssetsObj.asset_a_nick + '] to do a task...');
  directMessage({
    ent: gAssetsObj.asset_a_nick,
    channel: 'dm_channel',
    message: 'task',
    callback: 'checkTaskResponse',
    callback_data: { name: 'asset_a_nick' }
  });

  error('Direct Messaging asset_b_nick via ID [' + gAssetsObj.asset_b_nick + '] to do a task...');
  directMessage({
    ent: gAssetsObj.asset_b_nick,
    channel: 'dm_channel',
    message: 'task',
    callback: 'checkTaskResponse',
    callback_data: { name: 'asset_b_nick' }
  });

  error('Direct Messaging asset_c_nick via ID [' + gAssetsObj.asset_c_nick + '] to do a task...');
  directMessage({
    ent: gAssetsObj.asset_c_nick,
    channel: 'dm_channel',
    message: 'task',
    callback: 'checkTaskResponse',
    callback_data: { name: 'asset_c_nick' }
  });
}

handlerCreate({
  name: 'clickStart',
  channel: 'direct',
  message: 'clickStart'
});

setGlobalState({
  state_key: 'DM Key',
  data: { master: getSelfEnt() },
  callback: 'updatedData'
});
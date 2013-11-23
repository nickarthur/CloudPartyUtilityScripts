function updatedData(globalStateData) {
  error('Updated with ID: ' + getSelfEnt());
}

setGlobalState({
  state_key: 'DM Key',
  data: { asset_c_nick: getSelfEnt() },
  callback: 'updatedData'
});
function updatedData(globalStateData) {
  error('Updated with ID: ' + getSelfEnt());
}

setGlobalState({
  state_key: 'DM Key',
  data: { asset_b_nick: getSelfEnt() },
  callback: 'updatedData'
});
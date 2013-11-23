
handlerCreate()
{

}

function clickStart(clickEventData) {
  getGlobalState({
    state_key: 'DM Key',
    keys: ['asset_a_nick', 'asset_b_nick', 'asset_c_nick'],
    callback: 'printAssets',
    data: { greeting:"yo! man"}
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

function test(joe) {

  var a;

  var joke={v1:{av:'b'},v2:{cv:'d'},
  v3:{tess:"la"}};

  var joke2;

  joke2 = {v1:{av:'b'},v2:{cv:'d'},
    v3:{tess:"la"}};
  var b = {
    test: 'jon',
    sue: 'ellen',
    taby: 'cat'
  };
}


var name = getParam('Name');
var pollPeriod = getParam('Poll Period');
var assets = {};

function init(){
  error( 'CONTROLLER Saving Myself as: ' + getSelfEnt());

    setGlobalState({
      state_key: 'Racetrack Key',
      data: { controller: getSelfEnt() }
    });

    timerCreate({name: 'pollKeys', period: pollPeriod});
}




function pollKeys() {

    timerDestroy('countdownWait');

    getGlobalState({
      state_key: 'Racetrack Key',
      keys: ['ball1', 'ball2', 'ball3', 'controller'],
      callback: 'reportKeyToOutput'
    });
}


function reportKeyToOutput(globalStateData){
   assets = globalStateData;
   //error(stringify(assets, {newline: false}));
}


init();


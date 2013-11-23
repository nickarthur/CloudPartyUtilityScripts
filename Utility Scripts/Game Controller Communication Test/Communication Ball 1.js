var name = getParam('Name');


function init(){
  error( 'BALL_1: Saving Myself as: ' + getSelfEnt());

    setGlobalState({
      state_key: 'Racetrack Key',
      data: { ball1: getSelfEnt() }
    });
}


init();
var name = getParam('Name');


function init(){
  error( 'BALL_2: Saving Myself as: ' + getSelfEnt());

    setGlobalState({
      state_key: 'Racetrack Key',
      data: { ball2: getSelfEnt() }
    });
}


init();
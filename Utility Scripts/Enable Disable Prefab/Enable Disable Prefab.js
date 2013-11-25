function enable() {
  customizerSet({name: 'disabled', value: false});
  timerCreate({name: 'disable', delay: 3});
  timerDestroy('enable');
}

function disable() {
  customizerSet({name: 'disabled', value: true});
  timerDestroy('disable');
}

timerCreate({name: 'enable', delay: 3});
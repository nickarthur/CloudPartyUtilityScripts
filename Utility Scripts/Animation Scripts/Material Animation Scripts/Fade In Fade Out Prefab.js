// Opacity initially set to 0 (Transparent)
var opacity = 0;

// Updates prefab opacity
function fade(data) {
  opacity = (data.ease === 'in') ? opacity + 0.1 : opacity - 0.1;
  customizerSet({name: 'Opacity', value: opacity});
  if (opacity <= 0 || opacity >= 1) timerDestroy('fade');
}

// Event handler for fading in
function fadeIn() {
  timerCreate({name: 'fade', period: 0.1, data: {ease: 'in'}});
  timerDestroy('fadeIn');
}

// Event handler for fading out
function fadeOut() {
  timerCreate({name: 'fade', period: 0.1, data: {ease: 'out'}});
  timerDestroy('fadeOut');
}

// Initially set prefab to 0 (Transparent)
customizerSet({name: 'Opacity', value: opacity});

// 3-second mark - Fade in prefab
timerCreate({name: 'fadeIn', delay: 3});

// 6-second mark - Fade out prefab
timerCreate({name: 'fadeOut', delay: 6});
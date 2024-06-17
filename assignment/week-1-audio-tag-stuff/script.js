console.log('Hello, World!');

const audio = document.querySelector('#audio');
const startButton = document.querySelector('#start');
const log = document.querySelector('#log');

function updateLog(message) {
  const dateString = new Date().toLocaleString();
  log.innerHTML = `${message} (${dateString})<br/>` + log.innerHTML;
}

startButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    startButton.innerHTML = 'Pause';
    updateLog('Audio started');
  } else {
    audio.pause();
    startButton.innerHTML = 'Start';
    updateLog('Audio paused');
  }
});

setInterval(() => {
  // if the audio is paused, return

  if (audio.paused) {
    return;
  }
  // Generate a random number between 0 and 1
  const random = Math.random();

  // Modify the audio based on the random number
  switch (true) {
    case random < 0.25:
      increaseVolume(audio);
      updateLog(`Increased volume to ${audio.volume}`);
      break;
    case random < 0.5:
      decreaseVolume(audio);
      updateLog(`Decreased volume to ${audio.volume}`);
      break;
    case random < 0.75:
      increasePlaybackRate(audio);
      updateLog(`Increased playback rate to ${audio.playbackRate}`);
      break;
    default:
      decreasePlaybackRate(audio);
      updateLog(`Decreased playback rate to ${audio.playbackRate}`);
      break;
  }
}, 1000);

function increaseVolume(audio) {
  audio.volume += 0.1; // Increase the volume by 0.1
}

function decreaseVolume(audio) {
  audio.volume -= 0.1; // Decrease the volume by 0.1
}

function increasePlaybackRate(audio) {
  audio.playbackRate += 0.1; // Increase the playback rate by 0.1
}

function decreasePlaybackRate(audio) {
  audio.playbackRate -= 0.1; // Decrease the playback rate by 0.1
}

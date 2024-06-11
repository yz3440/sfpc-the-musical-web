console.log('Hello, World!');
//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

const playBtn = document.querySelector('#play');

playBtn.addEventListener('click', () => {
  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease('C4', '8n');
});

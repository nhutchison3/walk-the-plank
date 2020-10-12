let miniSong;
let oldMillis;
let button;
let noteButton;
let monoSynth;
let interval = 5;
let allowPlay = true;

function changeBG() {
  let valR = random(255);
  let valG = random(255);
  let valB = random(255);
  background(valR, valG, valB);
}

function preload() {
  soundFormats('mp3');
  miniSong = loadSound('assets/miniSong');
}

function setup() {
  createCanvas(600,800);
  background(0);
  button = createButton('click me');
  button.position(19,19);
  button.mousePressed(playSong);
  noteButton = createButton('play note');
  noteButton.position(50, 50);
  noteButton.mousePressed(playNote);
  
  miniSong.loop();
  miniSong.pause();
  
  monoSynth = new p5.MonoSynth();
  oldMillis = 0;
}

function draw() {
  background(0);
  fill(200);
  text("" + int(millis() / 1000), 200, 200);
  if (int(millis() / 1000) % interval == 0 && millis() >  1000) {
    if (allowPlay) {
      playNote();
    }
    allowPlay = false;
  }
  if (int(millis() / 1000) % interval + 1 == 0) {
    allowPlay = true;
  }
  
}

function playNote() {
  let note = 'Fb4';
  let velocity = 0.7;
  let time = 0;
  let dur = 1/4;
  monoSynth.play(note, velocity, time, dur);
}

function playSong() {
  if (miniSong.isPlaying()) {
    miniSong.pause();
  } else {
    miniSong.play();
  }
}

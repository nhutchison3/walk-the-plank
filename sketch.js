let miniSong;
let oldMillis;
let button;
let monoSynth;
let interval = 5;
let allowPlay = true;
let clearIntervalRef;
let startTime;
let timeRemaining = 5;

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
  createCanvas(400,200);
  background(0);
  button = [createButton('group 1: M'), createButton('group 2: MT'), createButton('group 3: T'), createButton('group 4: NA'), createButton('reset'), createButton('test single beep')];
  positions = [[20, 20], [150, 20], [20, 60], [150, 60], [100, 120], [80, 150]];
  buttonCalls = [musicOnly, musicAndInterval, intervalOnly, doNothing, reset, playNote];
  for (var i = 0; i < buttonCalls.length; i++) {
    var x = positions[i][0];
    var y = positions[i][1];
    button[i].position(x, y);
    button[i].mousePressed(buttonCalls[i]);
  }
  
  miniSong.loop();
  miniSong.pause();
  
  monoSynth = new p5.MonoSynth();
  oldMillis = 0;
}
let started = false;
function draw() {
  background(0);
  fill(200);
  
  if (started && timeRemaining < 5 && timeRemaining > 0) {
    timeRemaining = 5 - (millis() - startTime) / 1000;
    text("You have " + int(timeRemaining) + " seconds to get into position", 45, 100);
  } else if (!started && timeRemaining == 5) {
    text("Please press the button that corresponds to your group", 45, 100);
  } else if (timeRemaining <= 0 && started) {
    text("Press reset as needed", 45, 100);
  }
}

// Function for setting music delay by 5 seconds
function musicOnly() {
  startTime = millis();
  started = true;
  timeRemaining = 4.99;
  setTimeout(playSong, 5000);
}

// Function to delay setting interval by 5 seconds
function intervalOnly() {
  startTime = millis();
  started = true;
  timeRemaining = 4.99;
  setTimeout(playInterval, 5000);
}

function playSong() {
  miniSong.play();
}

function playInterval() {
  clearIntervalRef = setInterval(playNote, 15000);
}

function musicAndInterval() {
  musicOnly();
  intervalOnly();
}


function reset() {
  clearInterval(clearIntervalRef);
  miniSong.stop();
  timeRemaining = 5;
  started = false;
}

function doNothing() {
  startTime = millis();
  started = true;
  timeRemaining = 4.99;
}

function playNote() {
  let note = 'C4';
  let velocity = 1.0;
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

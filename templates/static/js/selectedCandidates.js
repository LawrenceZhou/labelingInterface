// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

///////////////////////////////
//TONE.js setup for audio play back
var samplesPath = 'https://storage.googleapis.com/melody-mixer/piano/';
var samples = {};
var NUM_NOTES = 36;
var MIDI_START_NOTE = 48;

for (var i = MIDI_START_NOTE; i < NUM_NOTES + MIDI_START_NOTE; i++) {
  samples[i] = samplesPath + i + '.mp3';
}

var players = new Tone.Players(samples, function onPlayersLoaded(){
    console.log("Tone.js players loaded");
}).toMaster();


// generates an array where indices correspond to midi notes

var everyNote = 'C,C#,D,D#,E,F,F#,G,G#,A,A#,B,'.repeat(20).split(',').map( function(x,i) {
    return x + '' + Math.floor(i/12);
});

//returns the midi pitch value for the given note.
//returns -1 if not found
function toMidi(note) {
    return everyNote.indexOf(note);
}

// go to https://goo.gl/magenta/musicvae-checkpoints to see more checkpoint urls
//var melodiesModelCheckPoint = 'https://storage.googleapis.com/download.magenta.tensorflow.org/models/music_vae/dljs/mel_small';
var melodiesModelCheckPoint = 'http://127.0.0.1:5000/public/mel_2bar';

// musicvae is trained on sequences of notes that are 2 bars, so 32 note per sequences.
// Input needs to be the the same format
var NUM_STEPS = 32; // DO NOT CHANGE.

//Uses promises to chain together asynchronous operations.
//Check out https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises for info on promises


function playNote(midiNote, numNoteHolds){
    var duration = Tone.Transport.toSeconds('16n') * (numNoteHolds || 1);
    var player = players.get(midiNote);
    player.fadeOut = 0.05;
    player.fadeIn = 0.01;
    player.start(Tone.now(), 0, duration);
}

var stepIndex = -1;


export default function sketch (p) {
///////////////////////////////
//p5.js setup
var TILE_WIDTH = 150;
var TILE_HEIGHT = 100;
var WIDTH = 160;
var HEIGHT = 120;
var SELECTED_COLOR;
var END_COLOR;
var noteSequence; 
var isSelected = false;
var startFlag = false;
var xStart;
var yStart;
var xEnd;
var yEnd;

var startStep_clicked;
var endStep_clicked;
var cid;
window.onload = function() {
 
}
p.selectRegion = false;
p.mousePressed = function () {
  if (p.mouseButton === p.LEFT && p.mouseX > (WIDTH - TILE_WIDTH) / 2 && p.mouseX < TILE_WIDTH + (WIDTH - TILE_WIDTH) / 2 && p.mouseY > 0 && p.mouseY < HEIGHT - TILE_HEIGHT) {
  xStart = p.mouseX;// - $(document).scrollLeft();
  yStart = p.mouseY; //- $(document).scrollTop();
  console.log(p.mouseY, p.mouseX)

  //startStep_clicked = Math.floor(xStart / 30);
  startStep_clicked = Math.floor(yStart / HEIGHT) * 32 + Math.floor((xStart - (WIDTH - TILE_WIDTH) / 2) / (TILE_WIDTH / 32)) % 32;
    p.selectRegion = false;
  console.log("content-aware start", startStep_clicked);
  }
  
}

p.mouseDragged = function () {
       if (p.mouseButton === p.LEFT &&  p.mouseY > 0 && p.mouseY < HEIGHT - TILE_HEIGHT && p.mouseX > 0 && p.mouseX < WIDTH) {
            xEnd = p.mouseX; //- $(document).scrollLeft();
            yEnd = p.mouseY;// - $(document).scrollTop();
    //endStep_clicked = Math.ceil(xStart / 30);
            if(p.mouseX > (WIDTH - TILE_WIDTH) / 2 && p.mouseX < TILE_WIDTH + (WIDTH - TILE_WIDTH) / 2 ){
                endStep_clicked = Math.floor(yEnd / HEIGHT) * 32 + Math.floor((xEnd - (WIDTH - TILE_WIDTH) / 2) / (TILE_WIDTH / 32)) % 32;
            }else if(p. mouseX > 0 && p.mouseX <= (WIDTH - TILE_WIDTH) / 2){
                endStep_clicked = 0;
            }else if(p.mouseX >= TILE_WIDTH + (WIDTH - TILE_WIDTH) / 2 && p.mouseX < WIDTH){
                endStep_clicked = 32;
            }

            console.log("content-aware end", endStep_clicked);

        p.selectRegion = true;
  
        }
}


p.mouseReleased = function () {
    if (p.mouseButton === p.LEFT &&  p.mouseY > 0 && p.mouseY < HEIGHT - TILE_HEIGHT && p.mouseX > 0 && p.mouseX < WIDTH) {
            xEnd = p.mouseX; //- $(document).scrollLeft();
            yEnd = p.mouseY;// - $(document).scrollTop();
    //endStep_clicked = Math.ceil(xStart / 30);
            if(p.mouseX > (WIDTH - TILE_WIDTH) / 2 && p.mouseX < TILE_WIDTH + (WIDTH - TILE_WIDTH) / 2 ){
                endStep_clicked = Math.floor(yEnd / HEIGHT) * 32 + Math.floor((xEnd - (WIDTH - TILE_WIDTH) / 2) / (TILE_WIDTH / 32)) % 32;
            }else if(p. mouseX > 0 && p.mouseX <= (WIDTH - TILE_WIDTH) / 2){
                endStep_clicked = 0;
            }else if(p.mouseX >= TILE_WIDTH + (WIDTH - TILE_WIDTH) / 2 && p.mouseX < WIDTH){
                endStep_clicked = 32;
            }
    
            console.log("content-aware end", endStep_clicked);
            p.regionSelect(cid, Math.min(startStep_clicked, endStep_clicked), Math.max(startStep_clicked, endStep_clicked));
            p.selectRegion = true;
  
    }
    if (p.mouseButton === p.LEFT && p.mouseX > (WIDTH - TILE_WIDTH) / 2 && p.mouseX < TILE_WIDTH + (WIDTH - TILE_WIDTH) / 2 && p.mouseY > 0 && p.mouseY < HEIGHT - TILE_HEIGHT) {
        xEnd = p.mouseX; //- $(document).scrollLeft();
            yEnd = p.mouseY;// - $(document).scrollTop();
            if((xEnd-xStart)<1.0 &&(yEnd-yStart)<1.0){
                 p.regionSelect(cid, -1, -1);
                 p.selectRegion = false;
            }
  }
}


function drawNotes(notes, x, y, width, height) {
    p.push();
    p.translate(x, y);
    var cellWidth = width / NUM_STEPS;
    var cellHeight = height / NUM_NOTES;
    notes.forEach(function(note) {
        var emptyNoteSpacer = 1;
        p.rect(emptyNoteSpacer + cellWidth * note.quantizedStartStep, height - cellHeight * (note.pitch-MIDI_START_NOTE),
            cellWidth * (note.quantizedEndStep - note.quantizedStartStep) - emptyNoteSpacer, cellHeight);
    });
    p.pop();
}

p.setup = function () {
    p.createCanvas(WIDTH, HEIGHT);
    SELECTED_COLOR = p.color(128, 255, 128);
    p.noStroke();
}

  p.myCustomRedrawAccordingToNewPropsHandler = function(props){
        if(props.candidate){
            console.log(props.candidate.notes);
            noteSequence = props.candidate.notes;
            isSelected = props.candidate.isSelected;
            startFlag = props.candidate.isPlaying;
            cid = props.candidate.cid;
           
            if(Tone.Transport.state === 'started' && startFlag) {
                stepIndex = -1;
            } else {
                //Tone.Transport.start();
            }
        }

        if(props.regionSelect){
          p.regionSelect = props.regionSelect;
        }
    
    }

p.draw = function () {
    //Draw Tiles + Notes
    //here we calculate the percentage through melodies, between 0-1
    //var totalPlayTime = (Tone.Transport.bpm.value * NUM_STEPS ) / 1000;
    var totalPlayTime = (1 / Tone.Transport.bpm.value / 4 * NUM_STEPS * 60) ;
    var percent = Tone.Transport.seconds / totalPlayTime % 1;
    var a = 180;
    //here we calculate the index of interpolatedNoteSequences
    //and currStepIndex is the note between 0-31 of that playback
    var currStepIndex = Math.floor(percent * NUM_STEPS);
    function isCurrentStep(note) {
        return note.quantizedStartStep === currStepIndex;
    }
    if(Tone.Transport.state === 'started' && startFlag) { //playback started
        if(currStepIndex != stepIndex) {
            //here we search through all notes and find any that match our current step index
            var notes = noteSequence.filter(isCurrentStep);
            notes.forEach(function(note) {
                var noteDuration = note.quantizedEndStep - note.quantizedStartStep;
                playNote(note.pitch, noteDuration);
            });         
        }
        stepIndex = currStepIndex;
    }


    //Draw Tiles + Notes
    //Drawing Tiles + notes
    p.background(128);

        var x = 0 * WIDTH + (WIDTH - TILE_WIDTH) / 2;
        var y = HEIGHT - TILE_HEIGHT;
        var currColor = SELECTED_COLOR;
        var noteColor = p.color(255, 255, 255);
        //use currColor but at 50% opacity
        p.fill(p.red(currColor), p.green(currColor), p.blue(currColor), a);
        p.rect(x, y, TILE_WIDTH, TILE_HEIGHT);
        

        if(p.selectRegion){
              p.fill(255, 64);
              p.push();
            p.rect(startStep_clicked * (WIDTH / 32), 10,
            (endStep_clicked - startStep_clicked) * (TILE_WIDTH / 32), HEIGHT - 10);
            p.pop();
        }
        p.fill(noteColor);
        if(noteSequence){
            drawNotes(noteSequence, x, y, TILE_WIDTH, TILE_HEIGHT);
            //console.log(noteSequence.notes);
        }
    //if(Tone.Transport.state === 'started' && startFlag){
    //    p.fill(255, 64);
    //    p.rect(percent * TILE_WIDTH, 0, TILE_WIDTH / NUM_STEPS, HEIGHT);
    //}
}


};


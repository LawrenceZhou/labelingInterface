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
var WIDTH = TILE_WIDTH;
var HEIGHT = 100;
var NORMAL_COLOR;
var REF_COLOR;
var noteSequence; 
var isSelected = false;
var startFlag = false;
var isFlag = false;
window.onload = function() {
 
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
    p.createCanvas(WIDTH , HEIGHT);
    //NORMAL_COLOR = p.color(128, 255, 128);
    NORMAL_COLOR = p.color(159, 159, 224);
    //REF_COLOR = p.color(64, 192, 64);
    REF_COLOR = p.color(159, 159, 224);
    p.noStroke();
}

var a; 

  p.myCustomRedrawAccordingToNewPropsHandler = function(props){
        if(props.candidate){
            console.log(props.candidate.notes);
            noteSequence = props.candidate.notes;
            isSelected = props.candidate.isSelected;
            startFlag = props.candidate.isPlaying;
            isFlag = props.candidate.isLastBest;
            //a = isSelected ? 0: 255;
            if(Tone.Transport.state === 'started' && startFlag) {
                stepIndex = -1;
            } else {
                //Tone.Transport.start();
            }
        }
    
    }

p.draw = function () {
    //Draw Tiles + Notes
    //here we calculate the percentage through melodies, between 0-1
    var totalPlayTime = (1 / Tone.Transport.bpm.value / 4 * NUM_STEPS * 60) ;
    //var totalPlayTime = (Tone.Transport.bpm.value * NUM_STEPS ) / 1000;
    var percent = Tone.Transport.seconds / totalPlayTime % 1;
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
    p.background(0, 0);

        var x = 0 * TILE_WIDTH;
        var y = 0;
        var currColor = isFlag && !isSelected ? REF_COLOR: NORMAL_COLOR;
        var noteColor = p.color(255, 255, 255);
        //use currColor but at 50% opacity
        p.push();
        p.fill(p.red(currColor), p.green(currColor), p.blue(currColor));
        p.rect(0, y, TILE_WIDTH, TILE_HEIGHT, 20);
        p.pop();
        p.fill(noteColor);
        if(noteSequence){
            drawNotes(noteSequence, x, y, TILE_WIDTH, TILE_HEIGHT);
            //console.log(noteSequence.notes);
        }
    if(Tone.Transport.state === 'started' && startFlag){
        p.push();
        p.fill(255, 64);
        if(percent * TILE_WIDTH < 10){
            p.rect(percent * TILE_WIDTH, y+10-percent*TILE_WIDTH, TILE_WIDTH / NUM_STEPS, HEIGHT-20 + 2*percent*TILE_WIDTH);
        }else if(percent * TILE_WIDTH >TILE_WIDTH - 14){
            p.rect(percent * TILE_WIDTH, y+percent*TILE_WIDTH-140+5, TILE_WIDTH / NUM_STEPS, HEIGHT-2*(percent*TILE_WIDTH-140)-10);
        }else{
            p.rect(percent * TILE_WIDTH, y, TILE_WIDTH / NUM_STEPS, HEIGHT);      
        }
        p.pop();
    }
}


};


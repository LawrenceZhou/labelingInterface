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




//Play with this to get back a larger or smaller blend of melodies
var numInterpolations = 5; //numInterpolations containing 32 notes

// generates an array where indices correspond to midi notes
var everyNote = 'C,C#,D,D#,E,F,F#,G,G#,A,A#,B,'.repeat(20).split(',').map( function(x,i) {
    return x + '' + Math.floor(i/12);
});

//returns the midi pitch value for the given note.
//returns -1 if not found
function toMidi(note) {
    return everyNote.indexOf(note);
}

//If you want to try out other melodies copy and paste any of these in https://github.....
/*var MELODY1 = { notes: [
    {pitch: toMidi('A3'), quantizedStartStep: 0, quantizedEndStep: 4},
    {pitch: toMidi('D4'), quantizedStartStep: 4, quantizedEndStep: 6},
    {pitch: toMidi('E4'), quantizedStartStep: 6, quantizedEndStep: 8},
    {pitch: toMidi('F4'), quantizedStartStep: 8, quantizedEndStep: 10},
    {pitch: toMidi('D4'), quantizedStartStep: 10, quantizedEndStep: 12},
    {pitch: toMidi('E4'), quantizedStartStep: 12, quantizedEndStep: 16},
    {pitch: toMidi('C4'), quantizedStartStep: 16, quantizedEndStep: 20},
    {pitch: toMidi('D4'), quantizedStartStep: 20, quantizedEndStep: 26},
    {pitch: toMidi('A3'), quantizedStartStep: 26, quantizedEndStep: 28},
    {pitch: toMidi('A3'), quantizedStartStep: 28, quantizedEndStep: 32}
]};*/

//you can also just put in the midi pitch note if you know it
/*
var MELODY2 = { notes: [
    {pitch: 50, quantizedStartStep: 0, quantizedEndStep: 1},
    {pitch: 53, quantizedStartStep: 1, quantizedEndStep: 2},
    {pitch: 58, quantizedStartStep: 2, quantizedEndStep: 3},
    {pitch: 58, quantizedStartStep: 3, quantizedEndStep: 4},
    {pitch: 58, quantizedStartStep: 4, quantizedEndStep: 5},
    {pitch: 53, quantizedStartStep: 5, quantizedEndStep: 6},
    {pitch: 53, quantizedStartStep: 6, quantizedEndStep: 7},
    {pitch: 53, quantizedStartStep: 7, quantizedEndStep: 8},
    {pitch: 52, quantizedStartStep: 8, quantizedEndStep: 9},
    {pitch: 55, quantizedStartStep: 9, quantizedEndStep: 10},
    {pitch: 60, quantizedStartStep: 10, quantizedEndStep: 11},
    {pitch: 60, quantizedStartStep: 11, quantizedEndStep: 12},
    {pitch: 60, quantizedStartStep: 12, quantizedEndStep: 13},
    {pitch: 60, quantizedStartStep: 13, quantizedEndStep: 14},
    {pitch: 60, quantizedStartStep: 14, quantizedEndStep: 15},
    {pitch: 52, quantizedStartStep: 15, quantizedEndStep: 16},
    {pitch: 57, quantizedStartStep: 16, quantizedEndStep: 17},
    {pitch: 57, quantizedStartStep: 17, quantizedEndStep: 18},
    {pitch: 57, quantizedStartStep: 18, quantizedEndStep: 19},
    {pitch: 65, quantizedStartStep: 19, quantizedEndStep: 20},
    {pitch: 65, quantizedStartStep: 20, quantizedEndStep: 21},
    {pitch: 65, quantizedStartStep: 21, quantizedEndStep: 22},
    {pitch: 57, quantizedStartStep: 22, quantizedEndStep: 23},
    {pitch: 57, quantizedStartStep: 23, quantizedEndStep: 24},
    {pitch: 57, quantizedStartStep: 24, quantizedEndStep: 25},
    {pitch: 57, quantizedStartStep: 25, quantizedEndStep: 26},
    {pitch: 62, quantizedStartStep: 26, quantizedEndStep: 27},
    {pitch: 62, quantizedStartStep: 27, quantizedEndStep: 28},
    {pitch: 65, quantizedStartStep: 28, quantizedEndStep: 29},
    {pitch: 65, quantizedStartStep: 29, quantizedEndStep: 30},
    {pitch: 69, quantizedStartStep: 30, quantizedEndStep: 31},
    {pitch: 69, quantizedStartStep: 31, quantizedEndStep: 32}
]};
*/

var All_I_Want_For_Christmas_Is_You_7 = { notes: [
    {pitch: toMidi('G6'), quantizedStartStep: 0, quantizedEndStep: 2},
    {pitch: toMidi('B6'), quantizedStartStep: 2, quantizedEndStep: 4},
    {pitch: toMidi('D7'), quantizedStartStep: 4, quantizedEndStep: 6},
    {pitch: toMidi('F7'), quantizedStartStep: 6, quantizedEndStep: 8},
    {pitch: toMidi('G7'), quantizedStartStep: 8, quantizedEndStep: 10},
    {pitch: toMidi('F7'), quantizedStartStep: 10, quantizedEndStep: 12},
    {pitch: toMidi('D7'), quantizedStartStep: 12, quantizedEndStep: 14},
    {pitch: toMidi('B6'), quantizedStartStep: 14, quantizedEndStep: 16},

    {pitch: toMidi('G6'), quantizedStartStep: 16, quantizedEndStep: 18},
    {pitch: toMidi('C7'), quantizedStartStep: 18, quantizedEndStep: 20},
    {pitch: toMidi('D7'), quantizedStartStep: 20, quantizedEndStep: 22},
    {pitch: toMidi('G7'), quantizedStartStep: 22, quantizedEndStep: 24},
    {pitch: toMidi('D7'), quantizedStartStep: 24, quantizedEndStep: 32},

]};


var Auld_Lang_Syne_4 = { notes: [
    {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 2},

    {pitch: 65, quantizedStartStep: 2, quantizedEndStep: 5},
    {pitch: 64, quantizedStartStep: 5, quantizedEndStep: 6},
    {pitch: 65, quantizedStartStep: 6, quantizedEndStep: 8},
    {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 10},
    {pitch: 67, quantizedStartStep: 10, quantizedEndStep: 13},
    {pitch: 65, quantizedStartStep: 13, quantizedEndStep: 14},
    {pitch: 67, quantizedStartStep: 14, quantizedEndStep: 16},
    {pitch: 69, quantizedStartStep: 16, quantizedEndStep: 17},
    {pitch: 67, quantizedStartStep: 17, quantizedEndStep: 18},

    {pitch: 65, quantizedStartStep: 18, quantizedEndStep: 21},
    {pitch: 65, quantizedStartStep: 21, quantizedEndStep: 22},
    {pitch: 69, quantizedStartStep: 22, quantizedEndStep: 24},
    {pitch: 72, quantizedStartStep: 24, quantizedEndStep: 26},
    {pitch: 74, quantizedStartStep: 26, quantizedEndStep: 30},
    {pitch: 74, quantizedStartStep: 30, quantizedEndStep: 32},
]};

var Sakura_3 = { notes: [
    {pitch: 45, quantizedStartStep: 0, quantizedEndStep: 2},
    {pitch: 45, quantizedStartStep: 2, quantizedEndStep: 4},
    {pitch: 47, quantizedStartStep: 4, quantizedEndStep: 8},

    {pitch: 45, quantizedStartStep: 8, quantizedEndStep: 10},
    {pitch: 45, quantizedStartStep: 10, quantizedEndStep: 12},
    {pitch: 47, quantizedStartStep: 12, quantizedEndStep: 16},

    {pitch: 45, quantizedStartStep: 16, quantizedEndStep: 18},
    {pitch: 47, quantizedStartStep: 18, quantizedEndStep: 20},
    {pitch: 48, quantizedStartStep: 20, quantizedEndStep: 22},
    {pitch: 47, quantizedStartStep: 22, quantizedEndStep: 24},

    {pitch: 45, quantizedStartStep: 24, quantizedEndStep: 26},
    {pitch: 47, quantizedStartStep: 26, quantizedEndStep: 27},
    {pitch: 45, quantizedStartStep: 27, quantizedEndStep: 28},
    {pitch: 41, quantizedStartStep: 28, quantizedEndStep: 32}
]};

var Sakura_6 = { notes: [
    {pitch: 81, quantizedStartStep: 0, quantizedEndStep: 2},
    {pitch: 81, quantizedStartStep: 2, quantizedEndStep: 4},
    {pitch: 83, quantizedStartStep: 4, quantizedEndStep: 8},

    {pitch: 81, quantizedStartStep: 8, quantizedEndStep: 10},
    {pitch: 81, quantizedStartStep: 10, quantizedEndStep: 12},
    {pitch: 83, quantizedStartStep: 12, quantizedEndStep: 16},

    {pitch: 81, quantizedStartStep: 16, quantizedEndStep: 18},
    {pitch: 83, quantizedStartStep: 18, quantizedEndStep: 20},
    {pitch: 84, quantizedStartStep: 20, quantizedEndStep: 22},
    {pitch: 83, quantizedStartStep: 22, quantizedEndStep: 24},

    {pitch: 81, quantizedStartStep: 24, quantizedEndStep: 26},
    {pitch: 83, quantizedStartStep: 26, quantizedEndStep: 27},
    {pitch: 81, quantizedStartStep: 27, quantizedEndStep: 28},
    {pitch: 77, quantizedStartStep: 28, quantizedEndStep: 32}
]};

var Sakura_6_s = { notes: [
    {pitch: 81, quantizedStartStep: 0, quantizedEndStep: 4},
    {pitch: 81, quantizedStartStep: 4, quantizedEndStep: 8},
    {pitch: 83, quantizedStartStep: 8, quantizedEndStep: 16},

    {pitch: 81, quantizedStartStep: 16, quantizedEndStep: 20},
    {pitch: 81, quantizedStartStep: 20, quantizedEndStep: 24},
    {pitch: 83, quantizedStartStep: 24, quantizedEndStep: 32},
]};

var Jasmine_4 = { notes: [
    {pitch: 64, quantizedStartStep: 0, quantizedEndStep: 2},
    {pitch: 64, quantizedStartStep: 2, quantizedEndStep: 3},
    {pitch: 67, quantizedStartStep: 3, quantizedEndStep: 4},
    {pitch: 69, quantizedStartStep: 4, quantizedEndStep: 5},
    {pitch: 72, quantizedStartStep: 5, quantizedEndStep: 6},
    {pitch: 72, quantizedStartStep: 6, quantizedEndStep: 7},
    {pitch: 69, quantizedStartStep: 7, quantizedEndStep: 8},

    {pitch: 67, quantizedStartStep: 8, quantizedEndStep: 10},
    {pitch: 67, quantizedStartStep: 10, quantizedEndStep: 11},
    {pitch: 69, quantizedStartStep: 11, quantizedEndStep: 12},
    {pitch: 67, quantizedStartStep: 12, quantizedEndStep: 14},

    {pitch: 67, quantizedStartStep: 16, quantizedEndStep: 18},
    {pitch: 67, quantizedStartStep: 18, quantizedEndStep: 20},
    {pitch: 67, quantizedStartStep: 20, quantizedEndStep: 22},
    {pitch: 64, quantizedStartStep: 22, quantizedEndStep: 23},
    {pitch: 67, quantizedStartStep: 23, quantizedEndStep: 24},

    {pitch: 69, quantizedStartStep: 24, quantizedEndStep: 26},
    {pitch: 69, quantizedStartStep: 26, quantizedEndStep: 28},
    {pitch: 67, quantizedStartStep: 28, quantizedEndStep: 30}
]};

var Jasmine_6 = { notes: [
    {pitch: 88, quantizedStartStep: 0, quantizedEndStep: 2},
    {pitch: 88, quantizedStartStep: 2, quantizedEndStep: 3},
    {pitch: 91, quantizedStartStep: 3, quantizedEndStep: 4},
    {pitch: 93, quantizedStartStep: 4, quantizedEndStep: 5},
    {pitch: 96, quantizedStartStep: 5, quantizedEndStep: 6},
    {pitch: 96, quantizedStartStep: 6, quantizedEndStep: 7},
    {pitch: 93, quantizedStartStep: 7, quantizedEndStep: 8},

    {pitch: 91, quantizedStartStep: 8, quantizedEndStep: 10},
    {pitch: 91, quantizedStartStep: 10, quantizedEndStep: 11},
    {pitch: 93, quantizedStartStep: 11, quantizedEndStep: 12},
    {pitch: 91, quantizedStartStep: 12, quantizedEndStep: 14},

    {pitch: 91, quantizedStartStep: 16, quantizedEndStep: 18},
    {pitch: 91, quantizedStartStep: 18, quantizedEndStep: 20},
    {pitch: 91, quantizedStartStep: 20, quantizedEndStep: 22},
    {pitch: 88, quantizedStartStep: 22, quantizedEndStep: 23},
    {pitch: 91, quantizedStartStep: 23, quantizedEndStep: 24},

    {pitch: 93, quantizedStartStep: 24, quantizedEndStep: 26},
    {pitch: 93, quantizedStartStep: 26, quantizedEndStep: 28},
    {pitch: 91, quantizedStartStep: 28, quantizedEndStep: 30}
]};

var MELODY1 = All_I_Want_For_Christmas_Is_You_7;
var MELODY2 = Auld_Lang_Syne_4;

// go to https://goo.gl/magenta/musicvae-checkpoints to see more checkpoint urls
//var melodiesModelCheckPoint = 'https://storage.googleapis.com/download.magenta.tensorflow.org/models/music_vae/dljs/mel_small';
var melodiesModelCheckPoint = 'http://127.0.0.1:5000/public/mel_2bar';

// musicvae is trained on sequences of notes that are 2 bars, so 32 note per sequences.
// Input needs to be the the same format
var NUM_STEPS = 32; // DO NOT CHANGE.
var NUM_NOTES = 88;
var MIDI_START_NOTE = 21; //lowest piano midi note
var interpolatedNoteSequences;

//Uses promises to chain together asynchronous operations.
//Check out https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises for info on promises
new musicvae.MusicVAE(melodiesModelCheckPoint)
    .initialize()
    .then(function(musicVAE) {
        //blends between the given two melodies and returns numInterpolations note sequences
        interpolatedNoteSequences =  musicVAE.interpolate([MELODY1, MELODY2], numInterpolations);
        document.querySelector('.loading').innerHTML = '&nbsp;';
    });

var sequenceIndex = -1;
var stepIndex = -1;


///////////////////////////////
//TONE.js setup for audio play back
var samplesPath = 'https://storage.googleapis.com/melody-mixer/piano/';
var samples = {};
var NUM_NOTES = 88;
var MIDI_START_NOTE = 21;
for (var i = MIDI_START_NOTE; i < NUM_NOTES + MIDI_START_NOTE; i++) {
  samples[i] = samplesPath + i + '.mp3';
}

var players = new Tone.Players(samples, function onPlayersLoaded(){
    console.log("Tone.js players loaded");
}).toMaster();


function playNote(midiNote, numNoteHolds){
    var duration = Tone.Transport.toSeconds('8n') * (numNoteHolds || 1);
    var player = players.get(midiNote);
    player.fadeOut = 0.05;
    player.fadeIn = 0.01;
    player.start(Tone.now(), 0, duration);
}

var sequenceIndex = -1;
var stepIndex = -1;

window.onload = function() {
document.getElementById("play").addEventListener("click", function(){
     if(!interpolatedNoteSequences) {
        return;
    }
    var loadingSpan = document.querySelector('.loading');
    if(Tone.Transport.state === 'started') {
        Tone.Transport.stop();
        loadingSpan.innerHTML = 'Play';
    } else {
        Tone.Transport.start();
        loadingSpan.innerHTML = 'Pause';
    }
});
}

export default function sketch (p) {
///////////////////////////////
//p5.js setup
var TILE_SIZE = 150;
var WIDTH = TILE_SIZE * (numInterpolations + 2);
var HEIGHT = 170;
var START_COLOR;
var END_COLOR;



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
    START_COLOR = p.color(60, 180, 203);
    END_COLOR = p.color(233, 72, 88);
    p.noStroke();
}

p.draw = function () {
    //Draw Tiles + Notes
    //here we calculate the percentage through melodies, between 0-1
    var totalPlayTime = (Tone.Transport.bpm.value * NUM_STEPS * (numInterpolations + 2)) / 1000;
    var percent = Tone.Transport.seconds / totalPlayTime % 1;

    //here we calculate the index of interpolatedNoteSequences
    //and currStepIndex is the note between 0-31 of that playback
    var currSequenceIndex = Math.floor(percent * (numInterpolations +2));
    var currStepIndex = Math.floor((percent * (numInterpolations+2) - currSequenceIndex) * NUM_STEPS);
    function isCurrentStep(note) {
        return note.quantizedStartStep === currStepIndex;
    }
    if(Tone.Transport.state === 'started') { //playback started
        if(currStepIndex != stepIndex) {
            //here we search through all notes and find any that match our current step index
            if (currSequenceIndex == 0){
                var notes = MELODY1.notes.filter(isCurrentStep);
                notes.forEach(function(note) {
                var noteDuration = note.quantizedEndStep - note.quantizedStartStep;
                playNote(note.pitch, noteDuration);
            });
            }

            else if(currSequenceIndex == numInterpolations + 1){
                var notes = MELODY2.notes.filter(isCurrentStep);
                notes.forEach(function(note) {
                var noteDuration = note.quantizedEndStep - note.quantizedStartStep;
                playNote(note.pitch, noteDuration);
            });
            }
            else{
                var notes = interpolatedNoteSequences[currSequenceIndex-1].notes.filter(isCurrentStep);
            notes.forEach(function(note) {
                var noteDuration = note.quantizedEndStep - note.quantizedStartStep;
                playNote(note.pitch, noteDuration);
            });
            }
            
        }
        sequenceIndex = currSequenceIndex;
        stepIndex = currStepIndex;
    }

    //Draw Tiles + Notes
    //Drawing Tiles + notes
    p.background(38);
    for(var i = 0; i < numInterpolations + 2; i++){

        var x = i * TILE_SIZE;
        var y = HEIGHT-TILE_SIZE;
        var currColor = p.lerpColor(START_COLOR, END_COLOR, i / (numInterpolations + 2));
        //use currColor but at 50% opacity
        p.fill(p.red(currColor), p.green(currColor), p.blue(currColor), 125);
        p.rect(x, y, TILE_SIZE, TILE_SIZE);
        p.fill(currColor);
        if(i == 0){
            drawNotes(MELODY1.notes, x, y, TILE_SIZE, TILE_SIZE);
        }
        else if(i == numInterpolations + 1){
            drawNotes(MELODY2.notes, x, y, TILE_SIZE, TILE_SIZE);
        }
        else if(interpolatedNoteSequences){
            drawNotes(interpolatedNoteSequences[i - 1].notes, x, y, TILE_SIZE, TILE_SIZE);
        }

    }
    p.fill(255, 64);
    p.rect(percent * WIDTH, 0, TILE_SIZE / NUM_STEPS, HEIGHT);
    p.text(sequenceIndex + " - " + currStepIndex, 15, 15);
}


};


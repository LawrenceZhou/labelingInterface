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
var numInterpolations = 2; //numInterpolations containing 32 notes




// musicvae is trained on sequences of notes that are 2 bars, so 32 note per sequences.
// Input needs to be the the same format
var NUM_STEPS = 32; // DO NOT CHANGE.
var NUM_NOTES = 36;
var MIDI_START_NOTE = 48; //lowest piano midi note --21

var noteSequence = [];

var samplesPath = 'https://storage.googleapis.com/melody-mixer/piano/';
var samples = {};
var metronome = "../../public/metronome.mp3";
var percent = 0;
for (var i = MIDI_START_NOTE - 1; i < NUM_NOTES + MIDI_START_NOTE; i++) {
  samples[i] = samplesPath + i + '.mp3';
}


var players = new Tone.Players(samples, function onPlayersLoaded(){
    console.log("Tone.js players loaded");
}).toMaster();

var playerM = new Tone.Player(metronome, function onPlayersLoaded(){
    console.log("Metronome player loaded");
}).toMaster();
playerM.volume.value = 1;

function playNote(midiNote, numNoteHolds){

    var duration = Tone.Transport.toSeconds('16n') * (numNoteHolds || 1);
    console.log("duration: ", Tone.Transport.toSeconds('16n'));
    var player = players.get(midiNote);
    player.fadeOut = 0.05;
    player.fadeIn = 0.01;
    player.start(Tone.now(), 0, duration);
}

function playMetronome(){
    var duration = Tone.Transport.toSeconds('16n');
    playerM.fadeOut = 0.05;
    playerM.fadeIn = 0.01;
    playerM.start(Tone.now(), 0, duration);
}

function playSilent(midiNote, numNoteHolds){

    var duration = Tone.Transport.toSeconds('16n') * (numNoteHolds || 1);
    var player = players.get(47);
    player.fadeOut = 0.05;
    player.fadeIn = 0.01;
    player.mute = true;
    player.start(Tone.now(), 0, duration);
}

var sequenceIndex = -1;
var stepIndex = -1;


export default function sketchManual (p) {
///////////////////////////////
//p5.js setup
var TILE_HEIGHT = 360;
var TILE_WIDTH = 480;
var WIDTH = TILE_WIDTH * 2;
var HEIGHT = 390;
var BARS_NUM = 4;

var xOffset = 0;
var yOffset = 0;


var NOTE_WIDTH_16 = 10;
var BAR_WIDTH = BARS_NUM * NOTE_WIDTH_16;


function drawBarSheet(num, x, y, width, height, isSelected) {
    var cellWidth = (width - WIDTH + TILE_WIDTH * 2) / 32;
    var cellHeight = height / 36;
    //var minorColor =  p.color(128, 128, 128);
    var minorColor =  p.color(255, 255, 255);
    //var majorColor =  p.color(224, 224, 224);
    var majorColor =  p.color(196, 196, 237);
    var majorStartColor =  p.color(178, 178, 230);
    var pianoColor = p.color(255, 255, 255);
    if(num == -1){
    p.fill(p.red(pianoColor), p.green(pianoColor), p.blue(pianoColor), 255);
    p.rect(x, y, 0, TILE_HEIGHT);
    }
    
    
    for(var i = 0; i < 36; i++){
      var oct_num = i % 12; 
      if(oct_num == 11 - 1 || oct_num ==11 - 3 || oct_num == 11 - 6 || oct_num == 11 - 8 || oct_num == 11 - 10 ){
        //p.fill(p.red(minorColor), p.green(minorColor), p.blue(minorColor), 125);
        p.fill(p.red(minorColor), p.green(minorColor), p.blue(minorColor));
      }else {
        if(oct_num == 11){
          p.fill(p.red(majorStartColor), p.green(majorStartColor), p.blue(majorStartColor));
        }else{
          p.fill(p.red(majorColor), p.green(majorColor), p.blue(majorColor));
        }
        //p.fill(p.red(majorColor), p.green(majorColor), p.blue(majorColor), 125);
      }
    p.rect(x,  y + i * cellHeight, width, cellHeight);
      //if(oct_num == 12 - 5 || oct_num == 0 && i != 0){
      if(oct_num == 12 - 5){
        p.push();
        //p.stroke(64);
        p.stroke("#fae");
        p.strokeWeight(1);
        p.line(x, y + i * cellHeight, x + width, y + i * cellHeight);
        p.pop(); 
      }
    }
    

    p.push();
    /*
    for (var i = 0; i < 3; i++){
      for (var j = 1; j <= 4; j++){
          p.stroke(64);
          p.strokeWeight(1);
          p.line(x, y + height / 3 * i + height / 21 * j, x, y + height / 3 * i + height / 21 * j);
      }
      for (var j = 1; j <= 3; j++){
          p.stroke(64);
          p.strokeWeight(1);
          p.line(x, y + height / 3 * i + height * 4 / 21 + height / 21 * j, x  , y + height / 3 * i + height * 4 / 21 + height / 21 * j);
      }
    }*/
    p.pop();


    p.push();
    /*    
    for (var i = 0; i < 3; i++){
      for (var j = 1; j <= 4; j++){
          p.stroke(64);
          p.strokeWeight(1);
          p.line(x, y + height / 3 * i + height / 21 * j, x , y + height / 3 * i + height / 21 * j);
      }
      for (var j = 1; j <= 3; j++){
          p.stroke(64);
          p.strokeWeight(1);
          p.line(x, y + height / 3 * i + height * 4 / 21 + height / 21 * j, x , y + height / 3 * i + height * 4 / 21 + height / 21 * j);
      }
    }*/
    p.pop();


    if(num == -1){
    p.push();    
    p.fill(0,0,0);
    for(var i = 0; i < 36; i++){
      var oct_num = i % 12; 
      if(oct_num == 11 - 1 || oct_num == 11 - 3 || oct_num == 11 - 6 || oct_num == 11 - 8 || oct_num == 11 - 10 ){
          p.rect(x,  y + i * cellHeight, (WIDTH - TILE_WIDTH * 2) / 2, cellHeight);
      }
    }
    p.pop();
  }

    p.push();
    //p.stroke(32);
    p.stroke("#fae");
    p.strokeWeight(2);
    p.line(x, y, x, y + height);
    p.line(x + width / 2, y, x + width / 2, y + height);
    for(var xhead = x + WIDTH - TILE_WIDTH * 2; xhead <= x + width; xhead += cellWidth){
      //p.stroke(64);
      p.stroke("#fae");
      p.strokeWeight(1);
      p.line(xhead, y, xhead, y + height);
    }
    p.pop();

    p.push();
    let s1 = String(2 * num + 1);
    let s2 = String(2 * num + 2);
    p.fill(255);
    p.textSize(18);
    p.text(s1, x + 4, y);
    p.text(s2, x + (width) / 2 + 4, y);
    p.pop();

    if(isSelected){
      var highlightColor = p.color(0, 255, 0);
      p.push();
      p.fill(p.red(highlightColor), p.green(highlightColor), p.blue(highlightColor), 64);
      p.rect(x, y, width, height);
      p.pop();
    }
}


var selectX;
var selectY;
var pitch_selected;
var startStep_selected;
var menuOut=false;
var selectLock = false;
var selectList = [];
var toPlay;
var popupOn;
var menotroneOn;
var lastSeconds = 0;
var barNums = 4; // bars
var selectedBars = barNums / 2;

$(document).bind("contextmenu",function(e){
  e.preventDefault();
  if(!popupOn && p.mouseX > 0 &&  p.mouseX < WIDTH * barNums / 2 &&  p.mouseY > 0 &&  p.mouseY < HEIGHT){
    selectX = p.mouseX;
    selectY = p.mouseY;
    pitch_selected = 84 - Math.ceil((selectY % HEIGHT - (HEIGHT - TILE_HEIGHT)) / 10);
    startStep_selected = Math.floor(selectY / HEIGHT) * 32 + Math.floor(selectX / 30);      
    noteSequence.forEach(function(note, i) {
      if (startStep_selected >= note.quantizedStartStep && startStep_selected < note.quantizedEndStep &&
        pitch_selected === note.pitch){
          noteSequence.splice(i, 1); 
          return;
        }
    });
  }
});

var currStepIndex;
function isCurrentStep(note) {
        return note.quantizedStartStep === currStepIndex;
    }

function drawNotes(notes, row, col, x, y, width, height) {
    p.push();
    p.translate(x + WIDTH - TILE_WIDTH * 2, y);
    var cellWidth = width / 16;
    var cellHeight = height / 36;
    //var currColor = p.color(255, 255, 255);
    //var currColor = p.color(225, 157, 157);
    //var currColor = p.color(213, 118, 118);
    var currColor = p.color(138, 219, 138);

    if(notes.length != 0){
      notes.forEach(function(note) {
        var emptyNoteSpacer = 1;
        if (startStep_clicked >= note.quantizedStartStep && startStep_clicked < note.quantizedEndStep || selectList.includes(note) || (isCurrentStep(note) && Tone.Transport.state === 'started' && toPlay)){
          //p.fill(note.color.r, note.color.g, note.color.b, 64);
          p.fill(p.red(currColor), p.green(currColor), p.blue(currColor), 64);
        p.rect(emptyNoteSpacer + cellWidth * (note.quantizedStartStep - 32 * row - 16 * col) + xOffset, height - cellHeight * (note.pitch-MIDI_START_NOTE + 1) + yOffset,
            cellWidth * (note.quantizedEndStep - note.quantizedStartStep) - emptyNoteSpacer, cellHeight, 20);
        }else{
        //p.fill(note.color.r, note.color.g, note.color.b);
          p.fill(p.red(currColor), p.green(currColor), p.blue(currColor));
        p.rect(emptyNoteSpacer + cellWidth * (note.quantizedStartStep - 32 * row - 16 * col), height - cellHeight * (note.pitch-MIDI_START_NOTE + 1),
            cellWidth * (note.quantizedEndStep - note.quantizedStartStep) - emptyNoteSpacer, cellHeight, 20);
    }});
    }
    
    p.pop();
}

  p.myCustomRedrawAccordingToNewPropsHandler = function(props){
        if(props.candidate){
            console.log(props.candidate.notes);
            noteSequence = props.candidate.notes;
        }

        toPlay = props.toPlay;

        
        popupOn = props.popupOn;
        console.log(props.popupOn);


        if(props.barNums){
        barNums = props.barNums;
        p.resizeCanvas(WIDTH  * barNums / 2, HEIGHT);
        //p.resizeCanvas(WIDTH, HEIGHT * barNums / 2);
        }

        if(props.updateResult){
          p.updateResult = props.updateResult;
        }

        if(props.updatePosition){
          p.updatePosition = props.updatePosition;
        }

        if(props.bpm){
          Tone.Transport.bpm.value = props.bpm;
        }

        if(props.ts){
          Tone.Transport.timeSignature = props.ts;
        }

        menotroneOn = props.menotroneOn;
        lastSeconds = props.lastSeconds;
        selectedBars = props.selectedBars;
    }

p.setup = function () {
    p.createCanvas(WIDTH  * barNums / 2, HEIGHT);
    p.noStroke();
}

var locked = false;
var xStart;
var yStart;
var xEnd;
var yEnd;
var pitch_clicked;
var startStep_clicked;
var endStep_clicked;
var flagToDraw = true;



var selectLock = false;
var selectList = [];

p.keyPressed = function () {
  if (p.keyCode === p.CONTROL) {
    selectLock = true;
  }
}

p.keyReleased = function () {
  if (p.keyCode === p.CONTROL) {
    selectLock = false;
  }
}

p.mousePressed = function () {
  //if (!popupOn && !menuOut && p.mouseButton === p.LEFT && p.mouseX > (WIDTH - TILE_WIDTH * 2) && p.mouseX < WIDTH && p.mouseY > 0 && p.mouseY < HEIGHT * barNums / 2) {
  if (!popupOn && !menuOut && p.mouseButton === p.LEFT && p.mouseX > 0 && p.mouseX < WIDTH * barNums / 2 && p.mouseY > HEIGHT - TILE_HEIGHT && p.mouseY < HEIGHT ) {
  xStart = p.mouseX;// - $(document).scrollLeft();
  yStart = p.mouseY; //- $(document).scrollTop();
  console.log(p.mouseY, p.mouseX)
  pitch_clicked = 84 - Math.ceil((yStart % HEIGHT - (HEIGHT - TILE_HEIGHT)) / 10);

  //startStep_clicked = Math.floor(yStart / HEIGHT) * 32 + Math.floor((xStart - WIDTH + TILE_WIDTH * 2)/ 30);
  startStep_clicked = Math.floor(xStart / WIDTH) * 32 + Math.floor((xStart - WIDTH * Math.floor(xStart / WIDTH))/ 30);

  console.log("start", pitch_clicked, startStep_clicked);
  if(noteSequence.length != 0){
  noteSequence.forEach(function(note) {
    if (startStep_clicked >= note.quantizedStartStep && startStep_clicked < note.quantizedEndStep &&
        pitch_clicked === note.pitch){
        if (selectLock) {
           
            selectList.push(note);
            console.log(selectList);
        }else{
          
            locked = true;
            return;
        }
        
    }
  });
}

if(noteSequence.length != 0){
        noteSequence.forEach(function(note) {
          if ((startStep_clicked >= note.quantizedStartStep && startStep_clicked < note.quantizedEndStep) || 
            (endStep_clicked > note.quantizedStartStep && endStep_clicked <= note.quantizedEndStep) ||
            (startStep_clicked <= note.quantizedStartStep && endStep_clicked >= note.quantizedEndStep) ||
            (endStep_clicked <= startStep_clicked && endStep_clicked != -1) ||
            (endStep_clicked - startStep_clicked > 32)){
              flagToDraw = false;
              return;
          }
        });
      }

  if(flagToDraw){
    noteSequence.push({pitch: pitch_clicked, quantizedStartStep: startStep_clicked, quantizedEndStep: startStep_clicked + 1});
      if (p.updateResult != null){
    p.updateResult(noteSequence);
    }  
  }
}
}

p.mouseDragged = function () {
      //if (!popupOn && !menuOut && p.mouseButton === p.LEFT && p.mouseX > 0 && p.mouseX < WIDTH && p.mouseY > 0 && p.mouseY < HEIGHT * barNums / 2) {
  if (!popupOn && !menuOut && p.mouseButton === p.LEFT && p.mouseX > 0 && p.mouseX < WIDTH * barNums / 2 && p.mouseY > HEIGHT - TILE_HEIGHT && p.mouseY < HEIGHT ) {
    xEnd = p.mouseX; //- $(document).scrollLeft();
    yEnd = p.mouseY;// - $(document).scrollTop();

    //endStep_clicked = Math.floor(yEnd / HEIGHT) * 32 + Math.ceil((xEnd - WIDTH + TILE_WIDTH * 2)/ 30);
    endStep_clicked = Math.floor(xEnd / WIDTH) * 32 + Math.ceil((xEnd - WIDTH *(Math.floor(xEnd / WIDTH)))/ 30);
    
    console.log("end", pitch_clicked, endStep_clicked);
    if(locked){
      xOffset = p.mouseX - xStart;
      yOffset = p.mouseY - yStart;
    }else{
      if(flagToDraw){
         noteSequence[noteSequence.length - 1].quantizedEndStep = endStep_clicked;
        if (p.updateResult != null){
          p.updateResult(noteSequence);
        }  
      }

    }
}
}

p.mouseReleased = function () {
      //if (!popupOn && !menuOut && p.mouseButton === p.LEFT && p.mouseX > 0 && p.mouseX < WIDTH && p.mouseY > 0 && p.mouseY < HEIGHT * barNums / 2) {
  if (!popupOn && !menuOut && p.mouseButton === p.LEFT && p.mouseX > 0 && p.mouseX < WIDTH * barNums / 2 && p.mouseY > HEIGHT - TILE_HEIGHT && p.mouseY < HEIGHT ) {
    xEnd = p.mouseX; //- $(document).scrollLeft();
    yEnd = p.mouseY;// - $(document).scrollTop();

    //endStep_clicked = Math.floor(yEnd / HEIGHT) * 32 + Math.ceil((xEnd - WIDTH + TILE_WIDTH * 2)/ 30);
    endStep_clicked = Math.floor(xEnd / WIDTH) * 32 + Math.ceil((xEnd - WIDTH *(Math.floor(xEnd / WIDTH)))/ 30);
    
  console.log("end", pitch_clicked, endStep_clicked);


  if(locked){
      var endPitch = 84 - Math.ceil((yEnd % HEIGHT - (HEIGHT - TILE_HEIGHT)) / 10);

      if(noteSequence.length != 0){
    noteSequence.forEach(function(note) {
    if (startStep_clicked >= note.quantizedStartStep && startStep_clicked < note.quantizedEndStep){
        note.pitch = endPitch;
        return;
    }
  });
  }
xOffset = 0;
yOffset = 0;
locked = false;
  }else {
    var overlapped = false;
    if(flagToDraw && noteSequence.length != 0){
        noteSequence.slice(0,noteSequence.length-1).forEach(function(note) {
          if ((startStep_clicked >= note.quantizedStartStep && startStep_clicked < note.quantizedEndStep) || 
            (endStep_clicked > note.quantizedStartStep && endStep_clicked <= note.quantizedEndStep) ||
            (startStep_clicked <= note.quantizedStartStep && endStep_clicked >= note.quantizedEndStep) ||
            (endStep_clicked <= startStep_clicked && endStep_clicked != -1) ||
            (endStep_clicked - startStep_clicked > 32)){
              if(startStep_clicked >= 0){
                overlapped = true;
                return;
              }   
          }
        });
      }
   
  /*if(flagToDraw && !overlapped){
         noteSequence[noteSequence.length - 1].quantizedEndStep = endStep_clicked;
        
      }
      else*/ if(overlapped){
        noteSequence.pop();
      }

  }
  if (p.updateResult != null){
  p.updateResult(noteSequence);

  }  
  }
  startStep_clicked = -1;
  endStep_clicked = -1;
  flagToDraw=true;
  
}



var lastState = false;
p.draw = function () {
    //var totalPlayTime = (Tone.Transport.bpm.value * NUM_STEPS * barNums / 2) / 1000;
    var totalPlayTime = (1 / Tone.Transport.bpm.value / 4 * NUM_STEPS * barNums / 2 * 60) ;
    if (!lastState){
      //console.log(lastSeconds);
      percent = lastSeconds/ totalPlayTime % 1;
      lastState = true;
    }else{
      percent =  (lastSeconds + Tone.Transport.seconds) / totalPlayTime % 1;
    }
    
    
    var currSequenceIndex = Math.floor(percent * barNums);
    //var currStepIndex = Math.floor((percent) * NUM_STEPS * barNums / 2);
    currStepIndex = Math.floor((percent) * NUM_STEPS * barNums / 2);
    //console.log(Tone.Transport.seconds, percent);
    
    if(Tone.Transport.state === 'started' && toPlay) { //playback started
        if(currStepIndex != stepIndex) {
            //here we search through all notes and find any that match our current step index
            var notes = noteSequence.filter(isCurrentStep);
            if(currStepIndex % 4 == 0 && menotroneOn){
              playMetronome();
            }
            if(currStepIndex === 0 && notes.length === 0){
                var noteDuration = 1;
                playSilent(0, noteDuration);
            }
            notes.forEach(function(note) {
                var noteDuration = note.quantizedEndStep - note.quantizedStartStep;
                playNote(note.pitch, noteDuration);
            });
        }
        sequenceIndex = currSequenceIndex;
        stepIndex = currStepIndex;
    }else{
      lastState = false;
    }

    function isCurrentBar(note, row, col) {
        return note.quantizedStartStep >= row * 32 + col * 16 && note.quantizedStartStep <  row * 32 + col * 16 + 16;
    }
    //Drawing Tiles + notes
    //p.background(38);
    p.background(177, 177, 238);
    for(var i = 0; i < barNums / 2; i++){
        for(var j = 0; j < 2; j++){
            //var x = j * TILE_WIDTH;
            var x = (i * 2 + j) * TILE_WIDTH;
            //var y = (i + 1) * HEIGHT - TILE_HEIGHT;
            var y = HEIGHT - TILE_HEIGHT;
            if(j == 0){
              if (selectedBars < barNums && selectedBars == i){
                  drawBarSheet(i, x, y, WIDTH, TILE_HEIGHT, true);
              }else{
                  drawBarSheet(i, x, y, WIDTH, TILE_HEIGHT, false);
              }
            }
        }
    }

    for(var i = 0; i < barNums / 2; i++){
        for(var j = 0; j < 2; j++){
            //var x = j * TILE_WIDTH;
            var x = (i * 2 + j) * TILE_WIDTH;
            //var y = (i + 1) * HEIGHT - TILE_HEIGHT;
            var y = HEIGHT - TILE_HEIGHT;
            var notesToDraw = noteSequence.filter(function(note){
                return isCurrentBar(note, i, j);
            });
            //if(notesToDraw.length > 0){
            if(noteSequence.length > 0){
                drawNotes(notesToDraw, i, j, x, y, TILE_WIDTH, TILE_HEIGHT);
            }
        

        }
    }
    
    //if(Tone.Transport.state === 'started' && toPlay){
    p.updatePosition(percent);
      p.fill(255, 80);
    p.rect(percent * TILE_WIDTH * barNums, 0, TILE_WIDTH / 16 / 5, HEIGHT);
  //}
}



};
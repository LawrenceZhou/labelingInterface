//Play with this to get back a larger or smaller blend of melodies
var numInterpolations = 2; //numInterpolations containing 32 notes




// musicvae is trained on sequences of notes that are 2 bars, so 32 note per sequences.
// Input needs to be the the same format
var NUM_STEPS = 32; // DO NOT CHANGE.
var NUM_NOTES = 36;
var MIDI_START_NOTE = 48; //lowest piano midi note --21

var noteSequence = [];




export default function sketchArea (p) {
///////////////////////////////
//p5.js setup
var TILE_HEIGHT = 360;
var TILE_WIDTH = 480;
var WIDTH = TILE_WIDTH * 2;
var HEIGHT = 390;
var BARS_NUM = 4;

var xOffset = 0;
var yOffset = 0;
 p.setup = () => p.createCanvas(1200, 400, p.WEBGL);

var NOTE_WIDTH_16 = 10;
var BAR_WIDTH = BARS_NUM * NOTE_WIDTH_16;
p.draw = () => {
    p.background(250);
    p.fill(p.color(138, 219, 138));
    p.noStroke();
    p.rect(0, 0, 55, 55, 20);

    p.fill(p.color(112, 29, 38));
    p.noStroke();
    p.rect(100, 100, 55, 55, 20);

    p.fill(p.color(138, 90, 18));
    p.noStroke();
    p.rect(80, 40, 55, 55, 20);
  };

};
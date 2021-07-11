//Play with this to get back a larger or smaller blend of melodies

export default function sketchManual (p) {
///////////////////////////////
//p5.js setup
var TILE_HEIGHT = 360;
var TILE_WIDTH = 480;
var WIDTH = 30 + TILE_WIDTH * 2;
var HEIGHT = 390;
var BARS_NUM = 2;

function drawBarSheet(num, x, y, width, height) {
    var cellWidth = (width - WIDTH + TILE_WIDTH * 2) / 32;
    var cellHeight = height / 36;
    var minorColor =  p.color(128, 128, 128);
    var majorColor =  p.color(224, 224, 224);
    var pianoColor = p.color(255, 255, 255);

    p.fill(p.red(pianoColor), p.green(pianoColor), p.blue(pianoColor), 255);
    p.rect(x, y, WIDTH - TILE_WIDTH * 2, TILE_HEIGHT);

    p.push();

    for (var i = 0; i < 3; i++){
      for (var j = 1; j <= 4; j++){
          p.stroke(64);
          p.strokeWeight(1);
          p.line(x, y + height / 3 * i + height / 21 * j, x  + 30, y + height / 3 * i + height / 21 * j);
      }
      for (var j = 1; j <= 3; j++){
          p.stroke(64);
          p.strokeWeight(1);
          p.line(x, y + height / 3 * i + height * 4 / 21 + height / 21 * j, x  + 30, y + height / 3 * i + height * 4 / 21 + height / 21 * j);
      }
    }
    p.pop();


    p.push();    
    for (var i = 0; i < 3; i++){
      for (var j = 1; j <= 4; j++){
          p.stroke(64);
          p.strokeWeight(1);
          p.line(x, y + height / 3 * i + height / 21 * j, x  + 30, y + height / 3 * i + height / 21 * j);
      }
      for (var j = 1; j <= 3; j++){
          p.stroke(64);
          p.strokeWeight(1);
          p.line(x, y + height / 3 * i + height * 4 / 21 + height / 21 * j, x  + 30, y + height / 3 * i + height * 4 / 21 + height / 21 * j);
      }
    }
    p.pop();


    p.push();    
    p.fill(0,0,0);
    for(var i = 0; i < 36; i++){
      var oct_num = i % 12; 
      if(oct_num == 11 - 1 || oct_num == 11 - 3 || oct_num == 11 - 6 || oct_num == 11 - 8 || oct_num == 11 - 10 ){
          p.rect(x,  y + i * cellHeight, (30) / 2, cellHeight);
      }
    }
    p.pop();


    p.push();
    p.fill(64);
    p.textSize(12);
    p.text("C5", x - 16 + 30, y + height / 3 * 1 - 2);
    p.text("C4", x - 16 + 30, y + height / 3 * 2 - 2);
    p.text("C3", x - 16 + 30, y + height / 3 * 3 - 2);
    p.fill(255);
    p.textSize(12);
    p.text("Bar#", x + 2, y - 4);
    //p.text("Num", x + 3, y - 4);
    p.pop();
}


p.setup = function () {
    p.createCanvas(30, HEIGHT);
    p.noStroke();
}


p.draw = function () {
  p.background(38);
  //p.background(177, 177, 238);
  p.push();
  p.fill(177, 177, 238);
//p.strokeWeight(3);
p.rect(0, 0, 30, 30);
p.pop();
    var x = 0;
    //var y = (i + 1) * HEIGHT - TILE_HEIGHT;
    var y = HEIGHT - TILE_HEIGHT;
    drawBarSheet(0, x, y, WIDTH, TILE_HEIGHT);
};
}
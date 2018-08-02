var cnv;
var socket = io();

function setup() {
    pixelDensity(2.0);
    smooth();
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.style('position','absolute');
    cnv.style('top','0');
    cnv.style('z-index','1');
    cnv.parent('#game-container');
}

function draw() {
    background('#26164e');
}

function mouseDragged() {
    console.log('dynamic-draw-input.js: Drawing: '+mouseX+', '+mouseY);
    socket.emit('user drawing', [mouseX, mouseY]);
    
    // prevent default
    return false;
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

var position, rad, b, e, curX, curY, cont, eitherOr, cnv;
var coral = '#f15c60';
var darkpurple = '#6441a4';
var mustard = '#fec167';
var cyan = '#44c4eb';
var palette = [coral, darkpurple, mustard, cyan];

var i = new Array();
eitherOr = [-1, 1];
rad = 15;
b = 0;

function setup() {
    pixelDensity(2.0);
    smooth();
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('z-index','-1');
    cnv.parent('p5');
    background(36,22,78);
    cont = true;
    i = new Array();
    dragArray = new Array();
    init();
    angleMode(DEGREES);
}

function draw() {
    background(36,22,78);
    for(var j = 0; j < i.length; j++){
        i[j].render();
        i[j].rotate();
    }
    for(var j = 0; j < dragArray.length; j++){
        dragArray[j].render();
        dragArray[j].rotate();
    }
}

function init() {
    cont=true;
    i=new Array();

    for(var x = 0; x < 16; x++) {
        for(var y = 0; y < 10; y++) {
            i.push(
            new Line((x*70)+(windowWidth/2 - 500), // x pos
                     (y*60)+220, // y pos
                     random(10, 50),      // length
                     random(-100,100))    // angle
            );
        }
    }
}

function mouseDragged() {
    if(random(-5,10) < 0){ dragArray.push(
            new Line(mouseX, // x pos
                     mouseY, // y pos
                     random(10, 50),      // length
                     random(-100,100))    // angle
            );}
}

function Line(xPos, yPos, length, angle) {
    this.length = length;
    this.pos = this.renderPos = createVector(xPos, yPos);
    this.angle = angle;
    this.color = random(palette);
    this.rotationMultiplier = random(10,50);
    
    this.renderPos.x = this.pos.x;
    this.renderPos.y = this.pos.y;
    
    this.renderPos.x += random(0,25);
    this.renderPos.y += random(0,25);
    
    this.rotate = function() {
        this.angle += 1;
    }
    
    this.render = function() {
        var newAngle = this.angle ;//+ (mouseX/windowWidth)*this.rotationMultiplier*3;
        var dX1 = sin(newAngle)*(length/2);
        var dY1 = cos(newAngle)*(length/2);
        //w = maxVal(((mouseX+200)/(windowWidth*2)), ((mouseY+200)/(windowHeight*2)))
        strokeWeight(8);
        stroke(this.color);
        line(this.renderPos.x - dX1, 
             this.renderPos.y - dY1, 
             this.renderPos.x + dX1, 
             this.renderPos.y + dY1
            );
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function maxVal(a,b) {
    if(a>b) {
        return a;
    }
    else {
        return b;
    }
}

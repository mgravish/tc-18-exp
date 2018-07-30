var position, rad, b, e, curX, curY, cont, eitherOr, cnv;
var limegreen = '#14ffc8';
var darkpurple = '#5d3b66';
var mustard = '#ffcc21';
var palette = [limegreen, darkpurple, mustard];

var i = new Array();
eitherOr = [-1, 1];
rad = 15;
b = 0;
e = 3.14159;
curX=100;

function setup() {
    pixelDensity(2.0);
    smooth();
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.style('position','absolute');
    cnv.style('top','0');
    cnv.style('height','100vh');
    cnv.style('z-index','1');
    background(200, 255, 255);
    cont = true;
    cnv.mousePressed(click);
    i=new Array();
}

function draw() {
    background(255, 255, 255);
    for(var j = 0; j < i.length; j++){
        i[j].step();
        i[j].render();
    }
    //console.log("drawing");
}

function click() {
    cont=true;
    i.push(new Curve(curX, 200, rad, rad, b, e, OPEN));
    curX+=100;
}

function Curve(x,y,w,h,start,stop,mode) {
    this.rad = .5;
    this.angle = 0;
    this.mult = random(eitherOr);
    this.pos = createVector(x, y);
    this.col = random(palette);
    
    this.step = function(){
        this.angle += .05*this.mult;
    }
    
    this.render = function(j) {
        stroke(this.col);
        // w = maxVal(((mouseX+200)/(windowWidth*2)), ((mouseY+200)/(windowHeight*2)))
        w= this.rad;
        strokeWeight(20*w);
        h = 50*w;
        noFill();
        arc(x,y,h,h,start+this.angle,stop+this.angle,mode);
    }

    this.grow = function(){
        this.rad += .3;
    }
}

function maxVal(a,b) {
    if(a>b) {
        return a;
    }
    else {
        return b;
    }
}

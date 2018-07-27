var r, g, b, rad, i, displayText, speed, cnv, max;
var limegreen = '#14ffc8';
var darkpurple = '#5d3b66';
var mustard = '#ffcc21';
var palette = [limegreen, darkpurple, mustard];

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.style('position','absolute');
    cnv.style('top','0');
    cnv.mousePressed(click);
    cnv.style('z-index','1');
    speed = 2;
    max = false;
    i = new Array();
    click();        
}

function draw() {
    background(255, 255, 255);
    strokeWeight(0);
    if(i.length<50 && !max) {
        if(frameCount%6===0) {
            // auto();
        }
    }
    else {
        max = true;
    }
    if(i.length===0) {
        noLoop();
        console.log("noLoop()");
    }
    for(var j=0; j<i.length; j++) {
        if(i[j].onscreen(j)) {
            i[j].step();
            i[j].move();
            i[j].render(j);
        } 
        else {
            i.splice(j,1);
            j--;
            console.log("Killed! Array length is now: "+i.length);
        }
    }
}

function click() {
    i.push(new Particle(random(300, cnv.width-300),random(300, cnv.height-300),i.length, 45));
    console.log(i.length);
}

function auto() {
    i.push(new Particle(random(300, cnv.width-300),random(300, cnv.height-300),i.length, 15));
    console.log(i.length);
}

function Particle(x,y,index, rad) {
    this.rad = rad;
    this.pos = createVector(x, y);
    this.dir = createVector(0,0);
    this.vel = createVector(0, 0);
    this.angle = radians(random([-180,-90,90,0]));
    this.prevAngle = 0;
    this.mappedAngle = 0;
    this.startTurn = 0;
    this.endTurn = 0;
    this.speed = speed;
    this.age = 1;
    
    var wMax, wMin, hMax, hMin;
    
    wMax = windowWidth;
    wMin = -this.rad;
    hMax = windowHeight;
    hMin = -this.rad;
    
    this.fill = random(palette);
    
    this.step = function() {
        this.age += 1;
    }
    
    this.move = function() {
        if(this.age%75===0){
            this.prevAngle = this.angle;
            this.startTurn = frameCount;
            this.angle += leftOrRight();
            this.speed += .1;
        }
        this.mappedAngle = map((frameCount-this.startTurn), 0, 40, this.prevAngle, this.angle,true);
		this.dir.x = cos(this.mappedAngle);
		this.dir.y = sin(this.mappedAngle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
    }
        
    this.onscreen = function(index) {
        if ( this.pos.y > hMax || this.pos.y< hMin || this.pos.x > wMax || this.pos.x< wMin ) {
            return false;
        } 
        else {
            return true;
        }
    }
    
    this.render = function(j) {
        fill(this.fill);
        ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
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

function leftOrRight(){
    return radians(random([90, 45,-45, -90]));
}
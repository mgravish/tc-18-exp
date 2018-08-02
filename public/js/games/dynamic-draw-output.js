var position, rad, b, e, curX, curY, cont, eitherOr, cnv;
var palette = ['#ffc35e', '#24c7f6', '#ff5a5a', '#6441a4']
var users = {};
var i = new Array();
eitherOr = [-1, 1];
rad = 15;
b = 0;

function setup() {
    pixelDensity(2.0);
    smooth();
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.style('position','absolute');
    cnv.style('top','0');
    cnv.style('z-index','1');
    cnv.parent('#game-container');
    cont = true;
    i = new Array();
    init();
    angleMode(DEGREES);
}

function init() {
    i=new Array();
    for(var x = 0; x < 16; x++) {
        for(var y = 0; y < 9; y++) {
            i.push(
            new Line((x*windowWidth/16)+40, // x pos
                     (y*windowHeight/9)+40, // y pos
                     random(10, 50),      // length
                     0)    // angle
            );
        }
    }
    noLoop();
}

function addUser(uID) {

}

function removeUser(uID) {
    if(users[uID]){
        delete users[uID];
    }
    else {
    }
}

function draw() {
    background('#26164e');
    console.log('drawing');
    for(var j = 0; j < i.length; j++){
        i[j].render();
    }
}

function Line(xPos, yPos, length, angle) {
    this.length = length;
    this.pos = this.renderPos = createVector(xPos, yPos);
    this.angle = angle;
    this.color = random(palette);
    this.renderPos.x = this.pos.x;
    this.renderPos.y = this.pos.y;
    this.renderPos.x += random(0,25);
    this.renderPos.y += random(0,25);
    
    this.rotate = function() {
        this.angle += 1;
    }
    
    this.render = function() {
        var newAngle = this.angle ;
        var dX1 = sin(newAngle)*(length/2);
        var dY1 = cos(newAngle)*(length/2);
        strokeWeight(8);
        stroke(this.color);
        line(this.renderPos.x - dX1, 
             this.renderPos.y - dY1, 
             this.renderPos.x + dX1, 
             this.renderPos.y + dY1
            );
    }
}

function userDraw(data) {
    for(var j = 0; j < i.length; j++) {
        i[j].angle = 90-atan2(data[1]-i[j].pos.y, data[0]-i[j].pos.x);
    }
    redraw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// function UserIMG(uID) {
//     var user = {};
//     var pos = createVector(random(0,windowWidth), random(0,windowHeight));
//     user.size = 1;
//     user.img = img;
//     user.x = pos.x;
//     user.y = pos.y;
//     user.w = user.img.width*user.size;
//     user.h = user.img.width*user.size;

//     user.grow = function() {
//         if(user.size<1.5)
//             user.size += .25;
//         user.w = user.img.width*user.size;
//         user.h = user.img.width*user.size;
//         console.log(user.size);
//     };

//     users[uID] = user;
// }

function maxVal(a,b) {
    if(a>b) {
        return a;
    }
    else {
        return b;
    }
}

var cnv, img, glitch, glitchArray, position, rad, b, e, curX, curY, cont, eitherOr, cnv, i, users;
var palette = ['#ffc35e', '#24c7f6', '#ff5a5a', '#6441a4'];
var users = {};

i = new Array();
users = {};
eitherOr = [-1, 1];
rad = 15;
b = 0;

function preload() {
    // img1 = loadImage('http://localhost:3000/_assets/stickers/1.png'); 
    // img2 = loadImage('http://localhost:3000/_assets/stickers/2.png');
    // img3 = loadImage('http://localhost:3000/_assets/stickers/3.png'); 
    // img4 = loadImage('http://localhost:3000/_assets/stickers/4.png'); 
    // img5 = loadImage('http://localhost:3000/_assets/stickers/5.png'); 
    // img6 = loadImage('http://localhost:3000/_assets/stickers/6.png'); 
    // img7 = loadImage('http://localhost:3000/_assets/stickers/7.png'); 
    // img8 = loadImage('http://localhost:3000/_assets/stickers/8.png'); 
    // img9 = loadImage('http://localhost:3000/_assets/stickers/9.png'); 
    // img10 = loadImage('http://localhost:3000/_assets/stickers/10.png');
    // img11 = loadImage('http://localhost:3000/_assets/stickers/11.png'); 
    // img12 = loadImage('http://localhost:3000/_assets/stickers/12.png'); 
    // img13 = loadImage('http://localhost:3000/_assets/stickers/13.png'); 
    // img14 = loadImage('http://localhost:3000/_assets/stickers/14.png'); 
}

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
    init();
    angleMode(DEGREES);
    glitchArray = new Group();
    
    dotsArray = new Array();
}

function addUser(uID) {
    new Dot(uID);
}

function removeUser(uID) {
    uID = parseInt(uID);
    if(users[uID]){
        users[uID].remove();
    }
    else {
    }
}

function grow(uID) {
    users[uID].grow();
}

function pushRight(uID) {
    users[uID].velocity.x = 200;
}

function pushLeft(uID) {
    users[uID].velocity.x = -200;
}

function pushUp(uID) {
    users[uID].velocity.y = -200;
}

function pushDown(uID) {
    users[uID].velocity.y = 200;
}

function init() {
    cont=true;
    for(var x = 0; x < 16; x++) {
        for(var y = 0; y < 9; y++) {
            i.push(
                new Line((x*windowWidth/16)+40, // x pos
                        (y*windowHeight/9)+40, // y pos
                        random(10, 50),      // length
                        random(-100,100))    // angle
            );
        }
    }
}

function draw() {
    background('#26164e');

    for(var j = 0; j < i.length; j++) {
        i[j].render();
        i[j].rotate();
    }

    for(var k=0; k<glitchArray.length; k++) {
        var mySprite = glitchArray[k];
        mySprite.attractionPoint(.2, windowWidth/2, windowHeight/2);
        mySprite.maxSpeed = 6;
        mySprite.displace(glitchArray);
    }

    drawSprites();
}

function Dot(uID) {
    var glitch = createSprite(cnv.width/2+random(20), cnv.height/2+random(20));
    glitch.addImage(random([img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14]));

    glitch.size = 40;
    glitch.setCollider("circle", 0, 0, glitch.size);
    glitch.mass = 3;
    

    // glitch.draw = function() { 
    //     // fill(glitch.fill);
    //     // // ellipse(0,0,glitch.size,glitch.size);
    // };
    
    glitch.grow = function() {
        glitch.size += 100;
        glitch.mass += 3;
        glitch.setCollider("circle", 0, 0, glitch.size);
    };

    glitchArray.add(glitch);
    users[uID] = glitch;
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
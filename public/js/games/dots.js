var cnv, img, glitch, glitchArray;
var palette = ['#ffc35e', '#24c7f6', '#ff5a5a', '#6441a4']

function setup() {
    pixelDensity(2.0);
    smooth();
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.style('position','absolute');
    cnv.style('top','0');
    cnv.style('z-index','1');
    cnv.parent('#game-container');
    glitchArray = new Group();
    var users={};
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

function draw() {
    background('#26164e');
    for(var i=0; i<glitchArray.length; i++)
    {
        var mySprite = glitchArray[i];
        mySprite.attractionPoint(.2, windowWidth/2, windowHeight/2);
        mySprite.maxSpeed = 6;
        mySprite.displace(glitchArray);
    }
    drawSprites();
}

function Dot(uID) {
    var glitch = createSprite(cnv.width/2+random(20), cnv.height/2+random(20));
    glitch.fill = random(palette);
    glitch.size = 40;
    glitch.setCollider("circle", 0, 0, glitch.size);
    glitch.mass = 3;

    glitch.draw = function() { 
        fill(glitch.fill);
        ellipse(0,0,glitch.size,glitch.size);
    };
    
    glitch.grow = function() {
        glitch.size += 100;
        glitch.mass += 3;
        glitch.setCollider("circle", 0, 0, glitch.size);
    };

    glitchArray.add(glitch);
    users[uID] = glitch;
}

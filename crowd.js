var cnv, img, glitch, glitchArray;
var limegreen = '#14ffc8';
var darkpurple = '#5d3b66';
var mustard = '#ffcc21';
var palette = [limegreen, darkpurple, mustard];
var dots={};

function setup() {
    pixelDensity(2.0);
    smooth();
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.style('position','absolute');
    cnv.style('top','0');
    cnv.style('z-index','1');
    glitchArray = new Group();
    dots={};
    dotsArray = new Array();
}

function addUser(uID) {
    console.log('Adding User Dot: '+ uID);
    // dotsArray.push(new Dot())
    dots[uID] = new Dot();
}

function removeUser(uID) {
    console.log('Deleting User Dot: '+uID);
    dots[uID].remove();
}

function grow(uID) {
    console.log('Growing User Dot: '+uID);
    dots[uID].grow();
}

function draw() {
    background(255, 255, 255);
    for(var i=0; i<allSprites.length; i++)
    {
        var mySprite = allSprites[i];
        mySprite.attractionPoint(.2, windowWidth/2, windowHeight/2);
        mySprite.maxSpeed = 4;
        mySprite.displace(glitchArray);
    }
    drawSprites();
}

function Dot() {
    var glitch = createSprite(cnv.width/2+random(20), cnv.height/2+random(20));
    glitch.fill = random(palette);
    glitch.size = 40;
    glitch.setCollider("circle", 0, 0, glitch.size);
    glitch.mass = 3;

    glitch.draw = function() { 
        fill(glitch.fill);
        ellipse(0,0,glitch.size,glitch.size);
    };
    
    glitchArray.add(glitch);

    this.remove = function () {
        remove(this);
    }

    this.grow = function() {
        glitch.size += 100;
        glitch.setCollider("circle", 0, 0, glitch.size);
    }
}

var cnv, img, glitch, glitchArray;
var limegreen = '#14ffc8';
var darkpurple = '#5d3b66';
var mustard = '#ffcc21';
var palette = [limegreen, darkpurple, mustard];

function setup() {
    pixelDensity(2.0);
    smooth();
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
    cnv.style('position','absolute');
    cnv.style('top','0');
    cnv.style('z-index','1');
    glitchArray = new Group();
    cnv.mousePressed(click);
    i=new Array();
    click();
}

function click() {
    cont=true;
    i.push(new Dot());
}

function grow(ID) {
    i[ID].grow();
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
    this.colliderSize = 40;
    this.size = 40;
    var glitch = createSprite(cnv.width/2+random(20), cnv.height/2+random(20));
    glitch.fill = random(palette);
    glitch.draw = function() { 
        fill(glitch.fill);
        ellipse(0,0,40,40);
    };
    glitch.setCollider("circle", 0, 0, this.colliderSize);
    glitch.mass = 3;
    glitchArray.add(glitch);

    this.grow = function() {
        this.colliderSize += 100;
        glitch.setCollider("circle", 0, 0, this.colliderSize);
    }
}

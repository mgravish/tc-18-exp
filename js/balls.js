var cnv, img, circle, circleOverArray, circleUnderArray;
var coral = '#f15c60';
var darkpurple = '#6441a4';
var mustard = '#fec167';
var cyan = '#44c4eb';
var palette = [coral, darkpurple, mustard, cyan];
var mouseCollider;

function setup() {
    pixelDensity(2.0);
    smooth();
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('z-index','3');
    cnv.parent('cfc-p5');
    circleOverArray = new Group();
    circleUnderArray = new Group();
    glob = loadImage("img/cfc-glob.png");
    init();
}

function draw() {
    clear();
    
    mouseCollider.position.x = mouseX;
    mouseCollider.position.y = mouseY;
    
    for(var i=0; i < allSprites.length; i++) {
        var mySprite = allSprites[i];
        mySprite.attractionPoint(.10, 1200, 200);
        mySprite.displace(circleOverArray);
        mySprite.displace(circleUnderArray);
    }
    
    drawSprites(circleUnderArray);
    image(glob, 1000, 102);
    drawSprites(circleOverArray);
}

function init() {
    mouseCollider = createSprite(mouseX, mouseY);
    mouseCollider.setCollider("circle", 0, 0, 40);
    mouseCollider.mass = 3;
    mouseCollider.visible = false;

    for (var i = 0; i < 25; i++){
        if(i%2) {
            addCircleUnder(1200+random(0,40), 175+random(0,40));
        } else {
            addCircleOver(1200+random(0,40), 175+random(0,40));
        }
    }
}

function addCircleOver(x,y) {
    circleOverArray.add(initCircle(x,y));
}

function addCircleUnder(x,y) {
    circleUnderArray.add(initCircle(x,y));
}

function initCircle(x,y) {
    var size = 40+random(-20,20);
    var circle = createSprite(x, y);
    circle.fill = coral;
    circle.draw = function() { strokeWeight(8); stroke(circle.fill); noFill(); ellipse(0,0,size,size); };
    circle.setCollider("circle", 0, 0, size-5);
    circle.mass = 3;
    circle.setSpeed(1.5, random(360));
    circle.maxSpeed = random(.1,.5);
    return circle;
}

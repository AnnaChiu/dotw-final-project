var myCanvas;
var clouds;
var rain = [];
var rainDirection = 0;

var umbrella;
var umbrellaMouse;

var petal;
var petalX, petalY;

function preload(){
	clouds = loadImage("images/huge-clouds.png");
	umbrella = loadImage("images/yellow-umbrella.png");

	petal = loadImage("images/petal.png");
}

function setup() {
	myCanvas = createCanvas(windowWidth, windowHeight);

	// set up 
	ellipseMode(CENTER);
	imageMode(CENTER);
	noCursor();

	// rain that starts in the clouds
	for(var drops = 0; drops < 100; drops++){
		rain.push(new Rain(random(0, windowWidth),-random(0,250)));
	}

	// rain that starts anywhere on the screen
	for(var drops = 0; drops < 100; drops++){
		rain.push(new Rain(random(0, windowWidth),random(0,windowHeight)));
	}

	umbrellaMouse = new Umbrella(windowWidth/2, windowHeight);

	petalX = -20;
	petalY = windowHeight/4;
}

function draw() {
	background(0, 64, 128);

	// make it rain
	for(var drops = 0; drops < rain.length; drops++){
		push();
		rain[drops].rotate();
		rain[drops].display();
		rain[drops].move();
		pop();

		collisionUmbrellaToRain(umbrellaMouse, rain[drops]);
	}

	// reset
	translate();

	// have umbrella move with mouse
	umbrellaMouse.display(mouseX, mouseY);

	// have a single petal blown into the scene
	petalBlown();

	// clouds
  	image(clouds,windowWidth/2,windowHeight/6,windowWidth,windowHeight/3);
}

// code per raindrop
function Rain(x,y){
	this.x = x;
	this.y = y;

	// randomly determine the rate of rain for this rain drop
	this.rainRate = random(2,5);

	// display the rain drops
	this.display = function(){
		fill(128, 191, 255);
		stroke(128, 191, 255);

		ellipse(this.x, this.y, 5, 15);
	}

	// move the rain downwards at all times and have the rain wrap around to fall again
	// when it reaches the bottom of the window + 200
	this.move = function(){
		// move rain down
		if(this.y < windowHeight + 200){
			this.y += this.rainRate;
		}
		else{
			this.y = -random(100,200);
			this.x = random(0, windowWidth);
			this.rainRate = random(2,5);
		}
	}

	// rotate rain in direction according to mouse click
	this.rotate = function(){
		// move rain in a direction
		if(rainDirection == -1){
			rotate(PI/15);
			
		}
		else if(rainDirection == 1){
			rotate(-PI/15);	
		}
	}
}

// umbrella as mouse
function Umbrella(x,y) {
	this.x = x;
	this.y = y;

	this.display = function(x,y){
		this.x = x;
		this.y = y;

		image(umbrella,this.x,this.y,300,300);
		// ellipse(this.x,this.y, 300, 300);
	}
}

// check for collision between raindrop and umbrella
function collisionUmbrellaToRain(umbrella, raindrop){
	var distance = dist(umbrella.x, umbrella.y, raindrop.x, raindrop.y);

	if(distance < 150){
		console.log("collision!");
		moveAway(umbrella, raindrop);
	}
}

// if collision occured, then have the rain move away from the umbrella
function moveAway(umbrella, raindrop){
	var distance = dist(umbrella.x, umbrella.y, raindrop.x, raindrop.y);
	if(distance < 160){
		raindrop.y -= 1;
		if(raindrop.x > umbrella.x){
			raindrop.x += 1;
		}
		else{
			raindrop.x -= 1;
		}
	}
}

// have a petal fall into the scene according to the rain direction
function petalBlown(){
	if(petalY < windowHeight + 25){
		if(rainDirection == 0){
			petalY += 1;
			petalX += 0.5;
		}
		else if(rainDirection == 1){
			petalY += 1;
			petalX += 1;
		}
		else{
			petalY += 1;
			petalX -= 1;
		}
	}

	image(petal,petalX,petalY,75,75);
}

// use mouse clicks to determine direction of rain
function mouseClicked(){
	// click right side of screen
	if(mouseX > 2 * (windowWidth/3)){
		console.log("right side clicked");
		rainDirection = 1;
	}
	// click on the middle portion of the screen
	else if(mouseX > windowWidth/3){
		console.log("middle clicked");
		rainDirection = 0;
	}
	// click on left side of screen
	else{
		console.log("left side clicked");
		rainDirection = -1;
	}
}

// resize canvas according to window
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
} 

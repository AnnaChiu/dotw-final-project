var lilypad, pinkLotus, whiteLotus, waterLily;
var lilypadImages = [];
var lilypads = [];
var myCanvas;

var petal, petalX, petalY;
var petalNoiseOffset;
var ripples = [];
var rippleCount = 3;
var ripplesStarted = false;
var rippleRadiuses = [5,4,3];


function preload(){
	// load the floating plant images
	lilypad = loadImage("images/lilypad.png");
	pinkLotus = loadImage("images/pink-lotus.png");
	whiteLotus = loadImage("images/white-lotus.png");
	waterLily = loadImage("images/white-water-lily.png");

	// load cherry blossom petal
	petal = loadImage("images/petal.png");
}

function setup() {
	myCanvas = createCanvas(windowWidth, windowHeight);

	// set noise detail for Perlin noise
  	noiseDetail(24);

  	// set modes
  	imageMode(CENTER);
  	ellipseMode(CENTER);

  	// save the lilypad images in an array
  	lilypadImages.push(lilypad);
	lilypadImages.push(pinkLotus);
	lilypadImages.push(whiteLotus);
	lilypadImages.push(waterLily);

  	// create lilypads
  	for(var i = 0; i < 15; i++){
  		var randomX = random(0,windowWidth/2);
  		var randomY = random(0,windowHeight/2);
  		console.log("start position", randomX, randomY)
  		lilypads.push(new Lilypad(randomX, randomY, 200, 200));
  	}

  	// set start position for petal
  	petalX = windowWidth/2;
  	petalY = 0;
  	// compute Perlin noise offset
  	petalNoiseOffset = random(0,1000);
}

function draw() {
	background(124,165,150); // pond color
	petalFall(); // falling petal

	// lilypads movement
  	for(var i = 0; i < lilypads.length; i++){
  		push();
  		lilypads[i].move();
  		lilypads[i].rotatePad();
  		lilypads[i].display();
  		pop();
  	}

  	translate(); // reset canvas to remove translations
}

// petal falling onto the pond surface
function petalFall(){
	// keep moving down until reach center of pond
	if(petalY < windowHeight/2){
		petalY += 1;
	}

	// swaying motion for petal
    var xPetalMovement = map(noise(petalNoiseOffset), 0, 1, -2, 2);
    petalX += xPetalMovement;

	// once the petal hits the pond surface, create water ripples
	if(petalY >= windowHeight/2 && !ripplesStarted){
		for(var r = 0; r < rippleCount; r++){
			ripples.push(new WaterRipple(petalX, petalY, rippleRadiuses[r]));
		}
		ripplesStarted = true;
	}

	// make the water ripple
	if(ripples.length != 0){
		for(var r = 0; r < ripples.length; r++){
			ripples[r].display();
			ripples[r].grow();
			if(ripples[r].radius >= 1000){
				ripples.splice(r,1);
			}
		}
	}

	image(petal,petalX,petalY,75,75);

	// advance noise offset a little bit
    petalNoiseOffset += 0.01;
}

// water ripple
function WaterRipple(x, y, radiusGrowthRate){
	this.x = x;
	this.y = y;

	this.radius = 0;

	this.display = function(){
		fill(124,165,150);
		stroke(0, 153, 153);

		ellipse(this.x, this.y, this.radius, this.radius);
	}

	this.grow = function(){
		this.radius += radiusGrowthRate;
		console.log(this.radius);
	}
}

// create constructor for a lilypad object
function Lilypad(x,y){
	// position of lilypad
	this.x = x;
	this.y = y;

	// initialize the rotation to 0 and get a random rate of rotation for the lilypad
	this.rotation = 0;
	this.rate = random(-0.001, 0.001);

	// compute a perlin noise offiset
  	this.noiseOffsetX = random(0,1000);
  	this.noiseOffsetY = random(0,1000);

  	// determine image for lilypad randomly
  	this.randomImage = function(){
	    // random number from [0,10)
	    var randomNum = random(0,10);
	    
	    // 70% chance regular lilypad
	    if(randomNum < 4){
	      	return 0;
	    }
	    // 10% pink lotus
	    else if(randomNum < 6){
	      	return 1;
	    }
	    // 10% white lotus
	    else if(randomNum < 7){
	      	return 2;
	    }
	    // 10% water lily
	    else{
	    	return 3;
	    }
	}
  
  	// set the mole type state randomly 
  	this.imageType = this.randomImage();

	// display the lilypad
	this.display = function(){
		// ellipseMode(CENTER);
		// ellipse(this.x, this.y, padWidth, padHeight);
		// rectMode(CENTER);
		// rect(this.x, this.y, this.padWidth, this.padHeight);


		if(this.imageType == 0){
			image(lilypadImages[0],this.x,this.y,150,149);
	      }
	    else if(this.imageType == 1){
	        image(lilypadImages[1],this.x,this.y,150,150);
	    }
	    else if(this.imageType == 2){
	        image(lilypadImages[2],this.x,this.y,150,150);
	    }
	   	else{
	    	image(lilypadImages[3],this.x,this.y,150,150);
	    }
	}

	// move the lilypad
	this.move = function(){
		// movement of lilypad in x and y direction
	    var xMovement = map(noise(this.noiseOffsetX), 0, 1, -1, 1);
	    this.x += xMovement;
	    var yMovement = map(noise(this.noiseOffsetY), 0, 1, -1, 1);
	    this.y += yMovement;

	   	// advance our noise offset a little bit
	    this.noiseOffsetX += 0.01;
	    this.noiseOffsetY += 0.01;
	}

	this.rotatePad = function(){
		// rotate the lilypad
	    translate(this.x, this.y);

		this.rotation += this.rate;
		rotate(this.rotation);
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
} 
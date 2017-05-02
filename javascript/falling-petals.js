// Due to the structure of the tree, this drawing is NOT meant to be resized
// if you do resize your screem, refresh your page

var treeOne, treeTwo, treeThree;
var petal;
var treePetals = [];
var myCanvas;

function preload(){
	petal = loadImage("images/petal.png");
}

function setup(){
	myCanvas = createCanvas(windowWidth, windowHeight);

	ellipseMode(CENTER);
	imageMode(CENTER);

	treeOne = new Tree(windowWidth/2, windowHeight, 550);
	treeTwo = new Tree(windowWidth/4, windowHeight, 550);
	treeThree = new Tree(3 * windowWidth/4, windowHeight, 550);
}

// grow the middle tree first then the two on either side
function draw(){
	fill(139,69,19);
	stroke(139,69,19);
	treeOne.grow();

	if(treeOne.treeGrown){
		treeTwo.grow();
		treeThree.grow();
	}
}

function Tree(x, y, height){
	this.baseX = x;
	this.baseY = y;
	this.treeHeight = height;
	this.currentHeight = 0;
	this.branches = [];
	this.startBranching = true;
	this.treeGrown = false;

	// try to recursively grow
	this.grow = function(){
		// grow trunk if it hasn't been grown yet
		if(this.baseY > 476){
			this.baseY -= 1;
			this.currentHeight += 1; // update 
		    ellipse(this.baseX,this.baseY,10,10);
		}
		// else start branching 
		else{
			if(this.currentHeight < this.treeHeight){
				console.log(this.currentHeight, this.treeHeight);
				this.branching = true;

				// start branching
				if(this.branching){
					this.branching = false;
					while(this.branches.length < 2){
						var newBranch = new Branch(this.baseX, this.baseY, this.baseY - 100);
						newBranch.radius = 9;
						newBranch.xChangeRate = 2;
						this.branches.push(newBranch);
					}
					var aBranching = this.branches[0].branchA();
					var bBranching = this.branches[1].branchB();

					// if both branching done
					if(aBranching && bBranching){
						this.branching = true;

						var branchingA = this.branches[0];
						var branchingB = this.branches[1];

						// A branch
						while(branchingA.aBranches.length < 2){
							var newBranchA = new Branch(branchingA.aStartX, branchingA.aStartY, branchingA.aStartY - 100);
							newBranchA.radius = 7;
							newBranchA.xChangeRate = 1.5;
							branchingA.aBranches.push(newBranchA);
						}
						var aABranching = branchingA.aBranches[0].branchA();
						var aBBranching = branchingA.aBranches[1].branchB();

						// if both branching done
						if(aABranching && aBBranching){
							this.branching = true;

							var abranchingA = branchingA.aBranches[0];
							var abranchingB = branchingA.aBranches[1];

							// A branch
							while(abranchingA.aBranches.length < 2){
								var newBranchAA = new Branch(abranchingA.aStartX, abranchingA.aStartY, abranchingA.aStartY - 100);
								newBranchAA.radius = 5;
								newBranchAA.xChangeRate = 1.65;
								abranchingA.aBranches.push(newBranchAA);
							}
							var aAABranching = abranchingA.aBranches[0].branchA();
							var aABBranching = abranchingA.aBranches[1].branchB();

							// B branch
							while(abranchingB.bBranches.length < 2){
								var newBranchAB = new Branch(abranchingB.bStartX, abranchingB.bStartY, abranchingB.bStartY - 100);
								newBranchAB.radius = 5;
								newBranchAB.xChangeRate = 0.45;
								abranchingB.bBranches.push(newBranchAB);
							}
							var aBABranching = abranchingB.bBranches[0].branchA();
							var aBBBranching = abranchingB.bBranches[1].branchB();
						}

						// B branch
						while(branchingB.bBranches.length < 2){
							var newBranchB = new Branch(branchingB.bStartX, branchingB.bStartY, branchingB.bStartY - 100);
							newBranchB.radius = 7;
							newBranchB.xChangeRate = 1;
							branchingB.bBranches.push(newBranchB);
						}
						var bABranching = branchingB.bBranches[0].branchA();
						var bBBranching = branchingB.bBranches[1].branchB();

						// if both branching done
						if(bABranching && bBBranching){
							this.branching = true;

							var bbranchingA = branchingB.bBranches[0];
							var bbranchingB = branchingB.bBranches[1];

							// A branch
							while(bbranchingA.aBranches.length < 2){
								var newBranchBAA = new Branch(bbranchingA.aStartX, bbranchingA.aStartY, bbranchingA.aStartY - 100);
								newBranchBAA.radius = 5;
								newBranchBAA.xChangeRate = 2.5;
								bbranchingA.aBranches.push(newBranchBAA);
							}
							var bAABranching = bbranchingA.aBranches[0].branchA();
							var bABBranching = bbranchingA.aBranches[1].branchB();

							// B branch
							while(bbranchingB.bBranches.length < 2){
								var newBranchBAB = new Branch(bbranchingB.bStartX, bbranchingB.bStartY, bbranchingB.bStartY - 100);
								newBranchBAB.radius = 5;
								newBranchBAB.xChangeRate = 0.75;
								bbranchingB.bBranches.push(newBranchBAB);
							}
							var bBABranching = bbranchingB.bBranches[0].branchA();
							var bBBBranching = bbranchingB.bBranches[1].branchB();

							if(bBABranching && bBBBranching){
								this.currentHeight += windowHeight - bbranchingB.bBranches[0].aStartY - 250;
							}
						}
					}
				}
			}
			else{
				this.treeGrown = true;
			}
		}
	}
}

function Branch(x, y, endHeight){
	this.aStartX = x;
	this.aStartY = y;
	this.aBranches = [];

	this.bStartX = x;
	this.bStartY = y;
	this.bBranches = [];

	this.radius = 9;
	this.xChangeRate = 1;

	this.branchA = function(){
		var createBud = random(0,75);
		var createBlossom = random(0,50);
		if(this.aStartY > endHeight){
			this.aStartY -= 1;
			this.aStartX -= this.xChangeRate;
			ellipse(this.aStartX, this.aStartY, this.radius, this.radius);
			
			// draw a bud on the tree
			if(createBud < 1){
				this.drawBud(this.aStartX, this.aStartY);
			}
			if(createBlossom < 1){
				this.drawBlossom(this.aStartX, this.aStartY);
			}
		}
		else{
			return true; // when done branching
		}
	}

	this.branchB = function(){
		var createBud = random(0,75);
		var createBlossom = random(0,50);
		if(this.bStartY > endHeight){
			this.bStartX += this.xChangeRate;
			this.bStartY -= 1;
			ellipse(this.bStartX, this.bStartY, this.radius, this.radius);

			// draw a bud on the tree
			if(createBud < 1){
				this.drawBud(this.bStartX, this.bStartY);
			}
			if(createBlossom < 1){
				this.drawBlossom(this.bStartX, this.bStartY);
			}
		}
		else{
			return true; // when done branching
		}
	}

	this.drawBud = function(x,y){
		fill(124,252,0);
		stroke(124,252,0);

		ellipse(x,y,15,15);
		image(petal, x, y, 50, 50);

		fill(139,69,19);
		stroke(139,69,19);
	}

	this.drawBlossom = function(x,y){
		treePetals.push(new Petal(x,y));
	}
}

function Petal(x, y){
	this.x = x;
	this.y = y;

	this.display = function(){
		image(petal, this.x, this.y, 75, 75);
	}
}
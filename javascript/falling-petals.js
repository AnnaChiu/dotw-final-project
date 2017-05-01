// var x,y;
// var aBranchX, aBranchY;
// var bBranchX, bBranchY;

// function setup() {
//   createCanvas(500,500);
//   x = 250;
//   y = 500;
//   aBranchX = 250;
//   aBranchY = 500;
//   bBranchX = 250; 
//   bBranchY = 500;
// }

// function draw() {
//   // base of tree
//   if(y > 350){
//     y -= 1;
//     aBranchY -= 1;
//     bBranchY -= 1;
//     ellipse(x,y,2,2);
//   }
  
//   if(y <= 350 && y > 250){
//     y -= 1;
    
//     aBranchY -= 1;
//     aBranchX = aBranchY-100;
//     ellipse(aBranchX,aBranchY,2,2);
    
//     bBranchY -= 1;
//     bBranchX += 1;
//     ellipse(bBranchX,bBranchY,2,2);
//   }
// }

var tree;

function setup(){
	tree = new Tree();
}

function draw(){
	tree.grow();
}

function Tree(x, y, height){
	this.baseX = x;
	this.baseY = y;
	this.treeHeight = height;
	this.currentHeight = 0;

	// branch to be grown
	this.branch = function (x, y, height){
		var endPoint = this.currentHeight + height;
		var tempCurrentHeight = this.currentHeight;
		var 

		if(y <= this.currentHeight && y > endPoint){
		    y -= 1;
		    tempCurrentHeight -= 1;

		    aBranchY -= 1;
		    aBranchX = aBranchY-100;
		    ellipse(aBranchX,aBranchY,2,2);
		}
		else{
			// update current height after branch done growing
			this.currentHeight = tempCurrentHeight;
		}
	}

	// try to recursively grow
	this.grow = function(){
		// grow trunk if it hasn't been grown yet
		if(this.currentHeight < this.treeHeight){
			// grow the trunk
			if(this.baseY > this.treeHeight){
				this.baseY -= 1;
				this.currentHeight += 1; // update 
			    ellipse(this.baseX,this.baseY,2,2);
			}
		}
		else{
			// TODO: the this.branch() only makes one branch, use random to choose between 1-4 branches
			// branch out 
			this.branch(x, y, 100);
		}
	}
}
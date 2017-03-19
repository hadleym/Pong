function setup(){
	createCanvas(400, 600);
	ball = new Ball(10, 10);
}


function draw(){
	ball.render();
}


function Ball(x , y){
	this.pos = createVector(x, y);
	this.radius = 10;
	
	this.render = function(){
		ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
	}

}

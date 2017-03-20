X_MIN = 0;
X_MAX = 600;
Y_MIN = 0;
Y_MAX = 400;

function setup(){
	X_MIN = 0;
	createCanvas(X_MAX, Y_MAX);
	ball = new Ball(10, 10);
	gameOver = false;
	paddle1 = new Paddle(10,10, 100, "right");
	paddle2 = new Paddle(X_MAX-20,10, 100, "left");
}


function draw(){
	if (checkGameOver()){
		clear();
		background(51);
		textSize(32);
		text("GAME OVER", 100, 100);
		fill(0, 102, 153);
	} else {
		clear();
		background(51);
		ball.update();
		ball.render();
		paddle1.update();
		paddle2.update();
		paddle1.render();
		paddle2.render();
	}
		
}

function keyPressed(){
	if ( keyCode == LEFT_ARROW){
		paddle2.movingDown = true;
	}
	if ( keyCode == RIGHT_ARROW){
		paddle2.movingUp = true;
	}
	if ( key === 'A' ){
		paddle1.movingUp = true;
	}	

	if ( key === 'F' ){
		paddle1.movingDown= true;
	}

}

function keyReleased(){
	if ( key === "F" ){
		paddle1.movingDown= false;
	}	
	if ( key === "A" ){
		paddle1.movingUp = false;
	}

	if ( keyCode == LEFT_ARROW){
		paddle2.movingDown = false;
		console.log("LEFT_ARROW released");
	}
	if ( keyCode == RIGHT_ARROW){
		paddle2.movingUp = false;
	}
}

function Ball(x , y){
	this.pos = createVector(x, y);
	this.radius = 10;
	this.vel = createVector(5.0, 4.0);
	this.update = function(){
		if ((this.pos.y + this.vel.y ) > Y_MAX || ( this.pos.y + this.vel.y ) < Y_MIN){
			this.vel.y = -this.vel.y;
		} 
		
		if ( paddle1.collide(ball) || paddle2.collide(ball))  {
			this.vel.x = -this.vel.x; 
		}
		this.pos.x = this.pos.x + this.vel.x;
		this.pos.y = this.pos.y + this.vel.y;
	}
	
	this.render = function(){
		ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
	}

}

function checkGameOver(){
	return ( ball.pos.x > X_MAX || ball.pos.x < X_MIN ) ;
}

	
Paddle = function(x,y,len, facing){
	this.pos = createVector(x,y);
	this.vel = 10;
	this.len = len;
	this.facing = facing;
	this.width = 10;
	this.movingDown = false;
	this.movingUp = false;


		
	this.update = function(){
		if (this.movingDown && ( this.pos.y + this.len + this.vel < Y_MAX)){
			this.pos.y = this.vel + this.pos.y;
		} else if (this.movingUp && ( this.pos.y - this.vel > Y_MIN )) {
			this.pos.y = this.pos.y - this.vel;
		}
	}
	
	this.render = function(){
		rect(this.pos.x, this.pos.y, this.width, this.len);	
	}

	this.collide = function (ball){
		if ( this.facing === "left" && ball.pos.x <= this.pos.x && (ball.pos.x + ball.vel.x) > this.pos.x && this.withinY(ball) ){
			return true;
		} else if ( this.facing === "right" && ball.pos.x >= this.pos.x+this.width&& ball.pos.x + ball.vel.x < this.pos.x+ this.width && this.withinY(ball) ) {
			return true;
		}
		return false;
	}

	this.withinY = function(ball){
		if ((ball.pos.y + ball.vel.y < this.pos.y + this.len ) && ( ball.pos.y + ball.vel.y > this.pos.y) ){
		return true;
		}
	}
}

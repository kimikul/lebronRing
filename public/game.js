$(document).ready(function() {
	startGame();
});

function startGame() {
	var CANVAS_WIDTH = 500;
	var CANVAS_HEIGHT = 460;

	var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height ='" + CANVAS_HEIGHT + "'></canvas>");
	canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('#game');

	var FPS = 30;
	var refreshInterval = setInterval(function() {
		update();
		draw();
	}, 1000/FPS);

	function update() {
		if (keydown.left && player.x > 5) {
			player.x -= 5;
		}
		if (keydown.right && player.x < CANVAS_WIDTH - player.width) {
			player.x += 5;
		}
		if (keydown.down && player.y < CANVAS_HEIGHT - player.height) {
			player.y += 5;
		}
		if (keydown.up && player.y > 0) {
			player.y -= 5;
		}
		moveRing();
		checkCollisions();
	}

	function draw() {
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		player.draw();
		ring.draw();
	}

	var player = {
		color: "#00A",
		x: 50,
		y: 50,
		width: 55,
		height: 78,
		draw: function() {
			canvas.fillStyle = this.color;
			canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};

	var ring = {
		color: "#AAA",
		x: 150,
		y: 200,
		width: 30,
		height: 26,
		draw: function() {
			canvas.fillStyle = this.color;
			canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	player.sprite = Sprite("lebron");
	player.draw = function() {
		this.sprite.draw(canvas, this.x, this.y);
	}

	ring.sprite = Sprite("ring");
	ring.draw = function() {
		this.sprite.draw(canvas, this.x, this.y);
	}

	function moveRing() {
		var random = Math.random();
		if (random > .875 && ring.x + ring.width < CANVAS_WIDTH) {
			ring.x += 4;
		} else if (random > .75 && ring.x + ring.width < CANVAS_WIDTH && ring.y + ring.height < CANVAS_HEIGHT) {
			ring.x += 2;
			ring.y += 2;
		} else if (random > .625 && ring.y + ring.height < CANVAS_HEIGHT) {
			ring.y += 4;
		} else if (random > .5 && ring.y + ring.height < CANVAS_HEIGHT && ring.x > 2) {
			ring.y += 2;
			ring.x -= 2;
		} else if (random > .375 && ring.y > 4) {
			ring.x -= 4;
		} else if (random > .25 && ring.x > 2 && ring.y > 2) {
			ring.x -= 2;
			ring.y -= 2;
		} else if (random > .125 && ring.y > 4) {
			ring.y -= 4;
		} else if (ring.y > 2 && ring.x + ring.width < CANVAS_WIDTH) {
			ring.y -= 2;
			ring.x += 2;
		}
		if (nearCollide(player, ring)) {
			if (keydown.left && ring.x > 5) {
				ring.x -= 7;
			}
			if (keydown.right && ring.x < CANVAS_WIDTH - ring.width) {
				ring.x += 7;
			}
			if (keydown.down && ring.y < CANVAS_HEIGHT - ring.height) {
				ring.y += 7;
			}
			if (keydown.up && ring.y > 0) {
				ring.y -= 7;
			}
		}
		if (ring.x + ring.width > CANVAS_WIDTH) {
			ring.x = 40;
		}
		if (ring.x < 0) {
			ring.x = CANVAS_WIDTH - ring.width - 40;
		}
		if (ring.y + ring.height > CANVAS_HEIGHT) {
			ring.y = 40;
		}
		if (ring.y < 0) {
			ring.y = CANVAS_HEIGHT - ring.height - 40;
		}
	}

	// collision detection
	function collides(a, b) {
		return a.x < b.x + b.width/2 &&
			   a.x + a.width/2 > b.x &&
			   a.y < b.y + b.height/2 &&
			   a.y + a.height/2 > b.y;
	}

	function nearCollide(a, b) {
		return a.x < b.x + b.width + 20 &&
			   a.x + a.width + 20 > b.x &&
			   a.y < b.y + b.height + 20 &&
			   a.y + a.height + 20 > b.y;
	}

	function checkCollisions() {
		if (collides(player, ring)) {
			//player.sprite = Sprite("lebron-smile");
			// console.log("colliding");
			player.sprite = Sprite("lebron-smile");

			
			// clearInterval(refreshInterval);
		} else {
			//player.sprite = Sprite("lebron");
			// console.log("not colliding");
			//alert("HI");
		}

	}

	$(function() {
	  window.keydown = {};
	  
	  function keyName(event) {
	    return jQuery.hotkeys.specialKeys[event.which] ||
	      String.fromCharCode(event.which).toLowerCase();
	  }
	  
	  $(document).bind("keydown", function(event) {
	    keydown[keyName(event)] = true;
	  });
	  
	  $(document).bind("keyup", function(event) {
	    keydown[keyName(event)] = false;
	  });
	});

}

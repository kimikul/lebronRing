$(document).ready(function() {
	// startGame();
});

function startGame() {
	var CANVAS_WIDTH = 600;
	var CANVAS_HEIGHT = 460;
	var startDate = new Date; // used for the timer
	var noClip = new Audio("images/DarthVaderNO.mp3");

	var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height ='" + CANVAS_HEIGHT + "'></canvas>");
	canvas = canvasElement.get(0).getContext("2d");
	$('#game').html(canvasElement);

	var FPS = 30;
	var refreshInterval = setInterval(function() {
		update();
		draw();
		updateTimer(startDate);
	}, 1000/FPS);

	function updateTimer(startDate) {
		var seconds = timeElapsed(startDate);
		var minutes = Math.floor(seconds/60).toString();
		seconds = (seconds % 60).toString();
		if (seconds.length < 2) {
			seconds = "0" + seconds;
		}
		var timePassed = minutes + ":" + seconds;
		$('#timer').html(timePassed);
	}

	function timeElapsed(startDate) {
		return Math.floor((new Date - startDate) / 1000);
	}

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
		x: 50,
		y: 50,
		width: 58,
		height: 74,
		frame: 0,
		spriteSheet: new Image(),
		draw: function() {
			this.spriteSheet.src = 'images/lebron-sheet.png';
			if(timeElapsed(startDate) > 14 && !collides(player, ring)) {
				this.frame = 2;
			}
			canvas.drawImage(this.spriteSheet, this.frame * 100, 0, this.width, this.height, this.x, this.y, this.width, this.height);
		}
	};

	var ring = {
		x: 150,
		y: 200,
		width: 30,
		height: 26,
		frame: 0,
		spriteSheet: new Image(),
		draw: function() {
			this.spriteSheet.src = 'images/ring.png';
			canvas.drawImage(this.spriteSheet, this.frame * 100, 0, this.width, this.height, this.x, this.y, this.width, this.height);
		}
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
		// ring will move away from the player
		if (nearCollide(player, ring)) {
			if (keydown.left && ring.x > 5) {
				ring.x -= 6;
			}
			if (keydown.right && ring.x < CANVAS_WIDTH - ring.width) {
				ring.x += 6;
			}
			if (keydown.down && ring.y < CANVAS_HEIGHT - ring.height) {
				ring.y += 6;
			}
			if (keydown.up && ring.y > 0) {
				ring.y -= 6;
			}
		}
		// ring teleportation code
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
			// change lebron to smile
			player.frame = 1;

			// play nooooo sound
			noClip.play();
			noClip.currentTime = 0;

			// stop movement and timer
			clearInterval(refreshInterval);

			// show play again button
			var playAgainButton = "<button class='btn btn-warning btn-large' type='submit' onclick='startGame()'>Play Again</button>";
			$('#game').append(playAgainButton);
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

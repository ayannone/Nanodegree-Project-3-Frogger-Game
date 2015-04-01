// Globals to set the min and max coordinate values for moving Player and Enemies on the canvas

var numEnemies = 4;

var lenX = 101;
var lenY = 83;

var playerStartXPos = 2 * lenX;
var playerStartYPos = 5 * lenY;
var playerMinXPos = 0;
var playerMinYPos = -40;
var playerMaxXPos = 4 * lenX; //404;
var playerMaxYPos = 5 * lenY; //415;

var enemyMaxXPos = 5 * lenX; //505;

// Enemies our player must avoid
var Enemy = function(startX,startY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = startX;
    this.y = startY;
    this.speed = Math.floor((Math.random() * 100) + 100); // speed  between 100 and 200
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > enemyMaxXPos) {
        this.x = -(Math.floor((Math.random() * 5) + 1) * lenX);
        this.y = Math.floor((Math.random() * 3) + 1) * lenY;
    } else {
        this.x = this.x + (this.speed * dt);

        // Collision detection with player
        // checking xPos first, then yPos

        // colSpace allows to overlap the position of the enemy and player images by xx pixels
        var colSpace = 25;

        for (var i = this.x; i <= this.x+lenX; i++) {
            if (i >= player.x+colSpace && i <= player.x+lenX-colSpace) {
                for (var j = this.y-lenY; j <= this.y; j++) {
                    if (j >= player.y-lenY+colSpace && j <= player.y-colSpace) {
                        player.reset(0);
                    }
                }
            }
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    // this.setSprite();
    this.x = playerStartXPos;
    this.y = playerStartYPos;
    this.score = 0;
}

Player.prototype.setSprite = function() {
    this.sprite = $('.active').attr('src');
    console.log('this.sprite: ', this.sprite);
}

// Update the player's position,
// automatically to start position, when reached the water line
Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        this.score += 100;
        this.reset(this.score);
    }
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Draw the player on the screen, required method for game
Player.prototype.handleInput = function(key) {

    switch(key) {
        case 'left': // x cannot be smaller than 0
            var leftPos = this.x - lenX;
            if (leftPos >= playerMinXPos) {
                this.x = leftPos;
            };
            break;
        case 'up': // y cannot be smaller than -40
            var upPos = this.y - lenY;
            if (upPos >= playerMinYPos) {
                this.y = upPos;
            };
            break;
        case 'right': // x cannot be bigger than 404
            var rightPos = this.x + lenX;
            if (rightPos <= playerMaxXPos) {
                this.x = rightPos;
            };
            break;
        case 'down': // y cannot be bigger than 415
            var downPos = this.y + lenY;
            if (downPos <= playerMaxYPos) {
                this.y = downPos;
            };
            break;
        default:
            console.log("wrong key for moving player");
    }
}

Player.prototype.reset = function(score){
    this.x = playerStartXPos;
    this.y = playerStartYPos;
    this.score = score;
    var h2Text = document.getElementById('score');
    h2Text.innerHTML = this.score;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for (var i=0; i < numEnemies; i++) {
    var startX = -(Math.floor((Math.random() * 5) + 1) * lenX);
    var startY = Math.floor((Math.random() * 3) + 1) * lenY;
    allEnemies.push(new Enemy(startX,startY));
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

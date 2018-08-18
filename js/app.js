// Enemies our player must avoid
// Parameter: startingRow, the row this enemy will move along
// Parameter: speed, the speed at which this enemy will move
var Enemy = function(startingRow, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // always start off the screen
    this.x = -101;

    // calculate the starting row
    this.y = 50 + ((startingRow - 1) * 83);

    // each enemy can have its own speed
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * 101 * dt;

    // If we've reached the end of the screen 
    // move the enemy back to the start
    if (this.x > 505) {
        this.x = -101;
    }

    // detect collision
    // get the x and y position of our player
    var playerY = player.getY(),
        playerX = player.getX();
    
    // to see if we hit a player see if it's:
    // - the same y position
    // - the x position of this enemy is between the edges of the square the player is in.
    if (playerY == this.y &&
        this.x < playerX + 50 &&
        this.x > playerX - 50) {
        // collision so reset the player
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The player class
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';

    // for x & y I decided to use the row and column number,
    // unlike the Enemy.
    this.x = 2;
    this.y = 5;
}

// update function - does nothing because the movement
// is handled in handleInput.
Player.prototype.update = function() {

};

// handleInput function which moves the player based on the key pressed
// Parameter: allowedKeys, the key which was pressed.
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'up':      this.setY(-1);
            break;
        case 'down':    this.setY(1);
            break;
        case 'left':    this.setX(-1);
            break;
        case 'right':   this.setX(1);
            break;
    }
};

// setX moves the player in the x direction by the given increment.
// We handle the edge of the screen in this function so the player 
// will never appear off screen.
// Parameter: xIncrement, the number of columns to move by.
Player.prototype.setX = function(xIncrement) {
    this.x += xIncrement;
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 4) {
        this.x = 4;
    }
}

// setY moves the player in the y direction by the given increment.
// We handle the bottom of the screen in this function so the player 
// will never appear off screen. If the player reaches the water
// then the player has won and we reset the game.
// Parameter: yIncrement, the number of rows to move by.
Player.prototype.setY = function(yIncrement) {
    this.y += yIncrement;
    if (this.y == 0) {
        this.reset();
    } else if (this.y > 5) {
        this.y = 5;
    }
}

// getY calculates the y pixel position based on the current
// y row number.
Player.prototype.getY = function() {
    return 50 + ((this.y - 1) * 83);
}

// getX calculates the x pixel position based on the current
// x row number.
Player.prototype.getX = function() {
    return this.x * 101;
}

// reset's the player back to the starting point in the grid.
Player.prototype.reset = function() {
    this.x = 2;
    this.y = 5;
}

// render the player on the grid 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.getX(), this.getY());
};

// initialize the enemies in different rows and with different speeds
var allEnemies = [new Enemy(1, 1.5), new Enemy(3, 2), new Enemy(2, 2.5), new Enemy(1, 1) , new Enemy(2, 1.2)];
// this is our player
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

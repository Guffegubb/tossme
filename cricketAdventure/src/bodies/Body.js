/**
 * Destroys the sprite
 */
function destroySprite(item) {
    item.destroy();
};

/**
 * Returns the value of alive in body sent in
 */
function isAlive(body) {
    return body.alive;
};

/**
 * Flips the body
 */
function flip(body) {
  body.scale.setTo(body.scale.x, body.scale.y * (-1));
};

/**
 * Makes a body play its death animation, flips the body as well as removes it
 * colliding to anything else in the world or the bounds of the world
 * Note that the body is not actually removed from game.
 */
function killBody(body) {
    body.enableBody = false;
    body.body.allowGravity = true;
    body.body.collideWorldBounds = false;
    body.body.checkCollision = false;
    body.body.outOfBoundsKill = true;
    body.alive = false;
    
    if (getDirectionY(body) === 1) {
        body.body.velocity.y = -200;
        flip(body);
    }
        
    body.animations.play('die', 0, true);
};

/**
 * Used to fetch center point of x-coordinate for objects that have default x-anchor (set to 0)
 */
function getObjectX(item) {
    return ( item.x + item.width / 2 );
};
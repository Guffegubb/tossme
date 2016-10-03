function destroySprite(item) {
    item.destroy();
};

function isAlive(body) {
    return body.alive;
};

function flip(body) {
  body.scale.setTo(body.scale.x, body.scale.y * (-1));  
};

function killBody(body) {
    // TODO: Fix so that the body is actually removed (At this point it doesn't
    // check outOfWorld bounds and there it is never killed :()
    body.enableBody = false;
    body.body.allowGravity = true;
    body.body.collideWorldBounds = false;
    body.body.checkCollision = false;
    body.body.outOfBoundsKill = true;
    body.alive = false;
    body.body.velocity.y = -200;
    
    flip(body);
    body.animations.play('die', 0, true);
}
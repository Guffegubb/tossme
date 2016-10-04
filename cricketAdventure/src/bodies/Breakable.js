/**
 * Checks if the player is standing on top of a breakable item in a group. If it does
 * it destroys these objects
 * 
 */
function checkBreakableCollision(player, breakables) {
    var isColliding = false;
    var collisionArray = [];

    breakables.forEach(function(item) {

        if (overlapY(player, item)) {
            if (overlapX(player, item)) {
                isColliding = true;
                collisionArray.push(item);
            }
        }
    });

    if (isColliding) {
        destroyBreakables(collisionArray);
        player.stopStomping();
    }
};


/**
 * Destroys all the breakable blocks found in the checkBreakableCollision function. 
 */
function destroyBreakables(collisionArray) {
    var temp;
    for (var i = collisionArray.length; 0 < i; i--) {
        temp = collisionArray.pop();
        destroySprite(temp);
    }
    breakAudio.play();

};

/**
 * Checks if a body is standing on top of an item
 * direction - the direction of the body compared to the item,
 * default value set to body is 'over' item.
 */
function overlapY(body, item, direction = 'over') {

    var overlapBool;

    if (direction == 'over') {
        overlapBool = (item.y - body.y <= 64 );
    }

    else if (direction == 'under') {
        overlapBool = ( (body.y - item.y <= 128) && ( body.body.touching.up ) );
    }
    return overlapBool;
};


/**
 * Checks if a body is overlapping with a block on the x-axis. 
 */
function overlapX(body, item) {
    diffX = Math.abs(getObjectX(item) - body.x);
    bodyHalfWidth = Math.abs(body.width / 2);
    return ((diffX >= 0 && diffX <= bodyHalfWidth + item.width / 2));
};


function touchingBreakableBlock(player, direction, breakables) {
    var touching = false;
    breakables.forEach(function(item) {
        if (overlapY(player, item, direction) &&
            overlapX(player, item)) {
            touching = true;
        }
    });
    return touching;
}

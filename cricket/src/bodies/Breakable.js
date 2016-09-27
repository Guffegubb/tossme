function checkBreakableCollision(game, player, item) {

    if (game.physics.arcade.collide(player, item) || nextToBreakable(player, item)) {
        checkDestruction(game, player, item);
        //checkDestruction(game, item);
    }

}

// TODO: Check the numbers with new sprite implemented
function checkDestruction(game, player, item) {
    
    if (player.isStomping && !player.body.touching.up) {

        // this loop checks if several blocks should be destroyed. Does not help 
        // against player standing halfway on normal ground though. 
        // using player.x instead of item.x because of otherwise destroying 3 blocks.
        breakableGroup.forEach(function(nearby) {
            if (item != nearby && (Math.abs(player.x - nearby.x) <= 50)) {
                destroySprite(nearby);
                
            }
        });
        
        breakAudio.play();
        destroySprite(item);
        player.stopStomping();
    }
}


// TODO: Check the numbers when new player sprite implemented
function nextToBreakable(player, item) {

    if (Math.abs(player.y - item.y) <= 64) {
        var check = player.x - item.x;
        if ((check <= 64 && check >= 0) || (check >= -5 && check <= 0)) {
            return true;
        }

    }
    /*
            if ( Math.abs(player.x - item.x) < 64 && Math.abs(player.y - item.y) <= 64) {
                // console.log("now next to or on top of breakable");
                return true;
            }
    */
    return false;
}


var touchBoolDown = false;
var touchBoolUp = false; 

// TODO: May need to tweak the numbers
// TODO: Can we refactor this / make it actually look halfway decent.
function touchingBreakableBlock(game, direction) {

    breakableGroup.forEach(function(item) {

        var tempX = Math.abs(player.x - item.x);
        var tempY = item.y - player.y;

        // TODO: Should it be 64 here? < or <= ? 
        if (direction == 'down') {

            if ((tempX < 32 && tempY < 64) && player.body.touching.down) {
                touchBoolDown = true;

                // TODO: This gives player slightly higher jump distance (decreasing timer doesnt change anything)
                // when jumping in hole where there used to be breakable block and other blocks close can fly.
                game.time.events.add(Phaser.Timer.SECOND * 0.01, function() {
                    touchBoolDown = false;
                });
            }
        }
        if (direction == 'up') {
            tempY = Math.abs(tempY);
            if ((tempX <= 64 && tempY <= 128) && player.body.touching.up) {
                touchBoolUp = true;

                game.time.events.add(Phaser.Timer.SECOND * 0.01, function() {
                    touchBoolUp = false;
                });

            }
        }

    });
    if (direction == 'down')
        return touchBoolDown;
    else if (direction == 'up')
        return touchBoolUp; 
    // return player.body.touching.down:
}

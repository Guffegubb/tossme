
function checkDestruction(game, item) {

    if (player.isStomping && !player.body.touching.up) {
        
        // this loop checks if several blocks should be destroyed. Does not help 
        // against player standing halfway on normal ground though. 
        // using player.x instead of item.x because of otherwise destroying 3 blocks.
        breakableGroup.forEach(function(nearby) {
            if ( item != nearby && (Math.abs(player.x - nearby.x) <= 64 ) ) {
                destroySprite(nearby);
            }
        });
        
        destroySprite(item);
        
        player.stopStomping();
    }
}


var touchBool = false;
// TODO: Can we refactor this / make it actually look halfway decent.
function touchingBreakableBlock(game) {

    breakableGroup.forEach(function(item) {
        
    var tempX = Math.abs(player.x - item.x);
    var tempY = item.y - player.y;
    
    // TODO: Should it be 64 here? < or <= ? 
    if ((tempX < 32 && tempY < 64) && player.body.touching.down) {
      touchBool = true;
      
      // TODO: This gives player slightly higher jump distance (decreasing timer doesnt change anything)
      // when jumping in hole where there used to be breakable block and other blocks close can fly.
      game.time.events.add(Phaser.Timer.SECOND * 0.01, function() {
      touchBool = false;     
      });
    }
    
    });
    
    return touchBool;
    // return player.body.touching.down:
}


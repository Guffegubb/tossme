// TODO: remove global after code done
/*global player*/
/*global Phaser*/

Player = function(game, x, y) {

  // TODO: check which variables should be inparameters to constructor
  // or send in one big property "array"
  var playerSpeed = 150;
  var jumpHeight = 800;
  var jumpTimer = 0;
  this.player = game.add.sprite(x, y, 'player');
  this.player.anchor.setTo(0.5, 0.5);

  game.physics.enable(this.player, Phaser.Physics.ARCADE);

  this.player.body.collideWorldBounds = true;
  this.player.animations.add('idle', [0, 1], 1, true);
  this.player.animations.add('jump', [2], 1, true);
  this.player.animations.add('run', [3, 4, 5, 6, 7, 8], 7, true);

  // potentially add amount of gravity here instead of in game logic. 
  this.player.body.allowGravity = true;

  // TODO: Comment this function
  this.player.move = function(direction) {

    if (direction == "stop") {
      player.body.velocity.x = 0;

      if (player.body.velocity.x == 0 && player.body.velocity.y == 0)
        player.animations.play('idle');
    }
    else if (direction == "right") {
      player.scale.setTo(1, 1);
      player.body.velocity.x += playerSpeed;
      player.animations.play('run');
    }
    else if (direction == "left") {
      player.scale.setTo(-1, 1);
      player.body.velocity.x -= playerSpeed;
      player.animations.play('run');
    }
    else if (direction == "jump") {
      if (player.body.onFloor() || player.body.touching.down) {
        player.body.velocity.y -= jumpHeight;
        jumpTimer = game.time.now + 750;
        player.animations.play('jump');
      }
    }
    else {
      // TODO: Error handling  
    }
    
  },
  
  // TODO: Comment, explain in-parameters and default values
  this.player.speedBoost = function(game, speedFactor, duration = 2) {
    console.log(playerSpeed);
    playerSpeed *= speedFactor;
    
    game.time.events.add(Phaser.Timer.SECOND * duration, function() {
    playerSpeed /= speedFactor;
    });
    
    console.log(playerSpeed);
  }


  return this.player;
}

// TODO: remove global after code done
/*global player*/
/*global Phaser*/

Player = function(game, properties) {
  
  var playerSpeed = properties.playerSpeed;
  var jumpHeight = properties.jumpHeight;
  
  this.player = game.add.sprite(properties.x, properties.y, 'player');
  this.player.anchor.setTo(0.5, 0.5);
  this.player.scale.setTo(0.5, 0.5);
  
  game.physics.enable(this.player, Phaser.Physics.ARCADE);
  
  this.player.body.collideWorldBounds = true;
  this.player.body.allowGravity = true;
  
  // TODO: Comment this function
  this.player.move = function(direction) {

    if (direction == "stop") {
      player.body.velocity.x = 0;
    }
    else if (direction == "right") {
      player.scale.setTo(0.5, 0.5);
      player.body.velocity.x += playerSpeed;
    }
    else if (direction == "left") {
      player.scale.setTo(-0.5, 0.5);
      player.body.velocity.x -= playerSpeed;
    }
    else if (direction == "jump") {
      if (player.body.onFloor() || player.body.touching.down) {
        player.body.velocity.y -= jumpHeight;
      }
    }
    else {
      // TODO: Error handling  
    }
    
  }
  
  return this.player;
  
}
// TODO: remove global after code done
/*global player*/
/*global Phaser*/

Player = function(game, properties) {
  
  
  
  
  
  this.player = game.add.sprite(properties.x, properties.y, 'player');
  this.player.anchor.setTo(0.5, 0.5);
  this.player.scale.setTo(0.5, 0.5);
  
  game.physics.enable(this.player, Phaser.Physics.ARCADE);
  
  this.player.body.collideWorldBounds = true;
  this.player.body.allowGravity = true;
  
  this.player.playerSpeed = properties.playerSpeed;
  this.player.jumpHeight = properties.jumpHeight;
  this.player.abilityOne = 'highJump';
  this.player.abilityTwo = 'longJump';
  
  
  
  // TODO: Comment this function
  this.player.move = function(direction) {

    if (direction == "stop") {
      player.body.velocity.x = 0;
    }
    else if (direction == "right") {
      player.scale.setTo(0.5, 0.5);
      player.body.velocity.x += player.playerSpeed;
    }
    else if (direction == "left") {
      player.scale.setTo(-0.5, 0.5);
      player.body.velocity.x -= player.playerSpeed;
    }
    else if (direction == "jump") {
      if (player.body.onFloor()) { // || player.body.touching.down
        player.body.velocity.y -= player.jumpHeight;
      }
    }
    else {
      // TODO: Error handling  
    }
    
  },
  
  // TODO: Implement timers so abilities can not be spammed.
  this.player.callAbility = function(key) {
    
    var ability;
    
    if (key == 1) {
      ability = player.abilityOne;
    }
    else if (key == 2) {
      ability = player.abilityTwo;
    }
    
    switch(ability) {
      case 'highJump':
        player.highJump();
        break;
      case 'longJump':
        player.longJump();
        break;
      case 'stomp':
        player.stomp();
        break;
      case 'shoot':
        player.shoot();
        break;
      default:
    }
    
  },
  
  // TODO: Implement these
  this.player.highJump = function() {
    console.log("jumping really high");
  },
  
  this.player.longJump = function() {
    console.log("jumping really long");
  },
  
  this.player.stomp = function() {
    
  },
  
  this.player.shoot = function() {
    
  }
  
  return this.player;
  
}
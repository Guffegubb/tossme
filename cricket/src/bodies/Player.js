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

  this.player.originalSpeed = properties.playerSpeed;
  this.player.playerSpeed = properties.playerSpeed;
  this.player.jumpHeight = properties.jumpHeight;
  this.player.abilityOne = 'highJump';
  this.player.abilityTwo = 'longJump';

  this.player.coolDown = 0;
  this.player.coolDownTime = 2000;
  this.player.moveLock = false;


  // TODO: Comment this function
  this.player.move = function(direction) {

    if (direction == "stop") {
      if (player.body.velocity.x > 0)
        player.body.velocity.x -= player.playerSpeed / 5;
      else if (player.body.velocity.x < 0)
        player.body.velocity.x += player.playerSpeed / 5;
      if (player.body.onFloor() || player.body.touching.down) {
        player.setMoveLock(false);
        player.playerSpeed = player.originalSpeed;
      }
        
    }

    if (!player.hasMoveLock()) {
      if (direction == "right") {
        player.scale.setTo(0.5, 0.5);
        player.body.velocity.x = player.playerSpeed;
      }
      else if (direction == "left") {
        player.scale.setTo(-0.5, 0.5);
        player.body.velocity.x = -player.playerSpeed;
      }
      else if (direction == "jump") {
        if (player.body.onFloor() || player.body.touching.down) {
          player.body.velocity.y -= player.jumpHeight;
        }
      }
      else {
        // TODO: Error handling  
      }
    }



  };


  this.player.callAbility = function(key) {

    var ability;

    if (key == 1) {
      ability = player.abilityOne;
    }
    else if (key == 2) {
      ability = player.abilityTwo;
    }

    switch (ability) {
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

  };

  this.player.highJump = function() {
    if (!player.hasCoolDown() && (player.body.onFloor() || player.body.touching.down)) {

      player.body.velocity.y -= player.jumpHeight * 1.9;
      player.playerSpeed /= 2;
      player.setCoolDown();
    }

  };

  this.player.longJump = function() {
    // TODO: Do we want to have the body.onFloor condition here as well? 
    if (!player.hasCoolDown()) {
      player.body.velocity.y -= player.jumpHeight;
      player.body.velocity.x = player.direction() * player.playerSpeed * 6;

      player.setCoolDown();
      player.setMoveLock(true);
    }
  };

  // TODO: Implement these
  this.player.stomp = function() {

  };

  this.player.shoot = function() {

  };

  this.player.hasCoolDown = function() {
    return !(game.time.now > player.coolDown);
  };

  this.player.hasMoveLock = function() {
    return player.moveLock;
  };

  this.player.setCoolDown = function() {
    player.coolDown = game.time.now + player.coolDownTime;
  };

  this.player.setMoveLock = function(bool) {
    player.moveLock = bool;
  };

  this.player.direction = function() {
    return (player.scale.x / Math.abs(player.scale.x));
  }



  return this.player;

}
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
  // Setting the max velocity in y to avoid being able to fall through
  // the world
  this.player.body.maxVelocity.y = 1000;

  this.player.originalSpeed = properties.playerSpeed;
  this.player.playerSpeed = properties.playerSpeed;
  this.player.jumpHeight = properties.jumpHeight;
  this.player.abilityOne = 'highJump';
  this.player.abilityTwo = 'longJump';
  this.player.abilityThree = 'stomp';
  this.player.newAbility = '';
  this.player.onAbility = false;

  this.player.coolDown = 0;
  this.player.coolDownTime = 2000;
  this.player.moveLock = false;
  this.player.isStomping = false;


  // TODO: Comment this function
  this.player.move = function(direction) {

    if (direction == "stop") {
      if (player.body.velocity.x > 0)
        player.body.velocity.x -= player.playerSpeed / 10;
      else if (player.body.velocity.x < 0)
        player.body.velocity.x += player.playerSpeed / 10;
      if (player.body.onFloor() || player.body.touching.down) {
        player.setMoveLock(false);
        if (player.isStomping)
          game.camera.shake(0.02, 150, false, Phaser.Camera.SHAKE_HORIZONTAL);
        player.isStomping = false;
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


  this.player.callAbility = function(key, callback) {

    var ability;

    if (player.hasAbilitySwap()) {
      player.swapAbility(key);
      callback();
    }
    /*if (player.onAbility == true) {
      if (key == 1)
        player.abilityOne = player.newAbility;
      else if (key == 2)
        player.abilityTwo = player.newAbility;
      else if (key == 3)
        player.abilityThree = player.newAbility;
    }*/

    else if (key == 1) {
      ability = player.abilityOne;
    }
    else if (key == 2) {
      ability = player.abilityTwo;
    }
    else if (key == 3) {
      ability = player.abilityThree;
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
      player.body.velocity.y = -player.jumpHeight * 0.9;
      player.body.velocity.x = player.direction() * player.playerSpeed * 4;

      player.setCoolDown();
      player.setMoveLock(true);
    }
  };

  // TODO: Do we want the stomp to act differentl used from the air and from the ground?
  this.player.stomp = function() {
    if (!player.hasCoolDown()) {
      player.isStomping = true;
      //  if(player.body.onFloor() || player.body.touching.down) {
      player.body.velocity.y = -player.jumpHeight * 1.2;

      game.time.events.add(Phaser.Timer.SECOND * 0.4, function() {
        player.body.velocity.y = player.body.maxVelocity.y;

      });
      //}
      //else {
      // player.body.velocity.y = player.body.maxVelocity.y;  
      //}

      player.setCoolDown();
      player.setMoveLock(true);
    }
  };

  this.player.shoot = function() {
    if (!player.hasCoolDown()) {
      console.log("pewpew im shooting");

    }
  };

  this.player.hasCoolDown = function() {
    return !(game.time.now > player.coolDown);
  };

  this.player.hasMoveLock = function() {
    return player.moveLock;
  };

  this.player.hasAbilitySwap = function() {
    if (game.physics.arcade.overlap(player, player.newAbility))
      return true;
    else
      return false;
  }

  this.player.setCoolDown = function() {
    player.coolDown = game.time.now + player.coolDownTime;
  };

  this.player.setMoveLock = function(bool) {
    player.moveLock = bool;
  };

  this.player.direction = function() {
    return (player.scale.x / Math.abs(player.scale.x));
  };

  this.player.setAbilitySwap = function(ability) {
    player.newAbility = ability;
  };

  this.player.swapAbility = function(key) {
    // TODO: Change how swapping works?
    // At the moment we can't swap any ability if one button has it already
    if (player.abilityOne != player.newAbility && player.abilityTwo != player.newAbility) {
      var tempAbility;
      if (key == 1) {
        tempAbility = player.abilityOne;
        player.abilityOne = player.newAbility.name;
      }
      else if (key == 2) {
        tempAbility = player.abilityTwo;
        player.abilityTwo = player.newAbility.name;
      }

      //console.log(tempAbility);
      // Changing the sprite, the key as well as name of ability on the ground,
      // not sure if everything is necessary
      player.newAbility.loadTexture(tempAbility);
      player.newAbility.name = tempAbility;
      player.newAbility.key = tempAbility;
      
    }
  };

  this.player.death = function() {

    // TODO: Add death animations/events
    player.spawn();

  };

  this.player.spawn = function() {

    spawnGroup.forEach(function(spawnPoint) {

      player.reset(spawnPoint.x, spawnPoint.y);

    }, this);

  };



  return this.player;

}
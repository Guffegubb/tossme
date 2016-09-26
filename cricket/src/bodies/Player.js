// TODO: remove global after code done
/*global player*/
/*global Phaser*/

var Player = function(game, properties) {


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
	this.player.abilityOne = null;
	this.player.abilityTwo = null;
	this.player.amountOfAbilities = 2;
	this.player.newAbility = '';
	this.player.onAbility = false;

	this.player.abilityCooldown = 0;
	this.player.swapCooldown = 0;
	this.player.coolDownTime = 1000;
	this.player.moveLock = false;
	this.player.isStomping = false;
	this.player.alive = true;


	// TODO: Comment this function
	this.player.move = function(direction) {

		if (direction == "stop") {
			
			// Gradually slows the player down to 0 speed. 
			if (player.body.velocity.x > 0)
				player.body.velocity.x -= player.playerSpeed / 10; 
			
			else if (player.body.velocity.x < 0)
				player.body.velocity.x += player.playerSpeed / 10;
	
			if (player.body.onFloor() || player.body.touching.down) {
				player.setMoveLock(false);
				player.stopStomping();
				player.playerSpeed = player.originalSpeed;
			}
		}
		 
		if (!player.hasMoveLock()) {
			if (direction == "right") {
				player.scale.setTo(0.5, player.scale.y);
				player.body.velocity.x = player.playerSpeed;
			}
			else if (direction == "left") {
				player.scale.setTo(-0.5, player.scale.y);
				player.body.velocity.x = -player.playerSpeed;
			}
			else if (direction == "jump") {
				if (player.body.onFloor() || touchingBreakableBlock(game, 'down')) {

					
					// this prevents the super jump by pressing up + highJump.
					// TODO: Can we refactor to not use the global controls variable? Put the check in other function or so? 
					if(!(controls.abilityOne.isDown || controls.abilityTwo.isDown))
						player.body.velocity.y = -player.jumpHeight;
				}
			}
			else {
				// TODO: Error handling?  
			}
		}



	};


	this.player.callAbility = function(key, callback, sprite, textureName) {

		var ability;

		if (player.canSwap()) {
			player.swapAbility(key);
			//player.swapAbility(key, callback, sprite, textureName);
			//allback(abilitySprite, textureName);
		}

		else if (key == 1) {
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
		if (!player.hasCoolDown() && ( player.body.onFloor() || touchingBreakableBlock(game, 'down') )) {

			player.body.velocity.y -= player.jumpHeight * 1.9;
			player.playerSpeed /= 2;
			player.setCoolDown();
		}

	};

	this.player.longJump = function() {
		// TODO: Do we want to have the body.onFloor condition here as well? 
		if (!player.hasCoolDown()) {
			player.body.velocity.y = -player.jumpHeight * 0.9;
			player.body.velocity.x = player.direction() * player.originalSpeed * 4;
			
			player.setCoolDown();
			player.setMoveLock(true);
		}
	};

	// TODO: Do we want the stomp to act differentl used from the air and from the ground?
	this.player.stomp = function() {
		if (!player.hasCoolDown() && !player.isStomping) {
			//  if(player.body.onFloor() || player.body.touching.down) {
			player.body.velocity.y = -player.jumpHeight * 1.2;


			game.time.events.add(Phaser.Timer.SECOND * 0.4, function() {
				if(player.body.velocity.y < 0) {
					player.isStomping = true;

					player.body.velocity.y = player.body.maxVelocity.y;
				}
				else {
					//player.isStomping = false;
					
				}
				
			});
			//}
			//else {
			// player.body.velocity.y = player.body.maxVelocity.y;  
			//}

			player.setCoolDown();
			player.setMoveLock(true);
		}
	};
	
	this.player.stopStomping = function() {
		if (player.isStomping) {
				game.camera.shake(0.02, 150, false, Phaser.Camera.SHAKE_HORIZONTAL);
		}
		player.isStomping = false;
	}

	this.player.shoot = function() {
		if (!player.hasCoolDown()) {
			shoot(game, player, projectiles);
			player.setCoolDown();
		}
	};


	this.player.direction = function() {
		return (player.scale.x / Math.abs(player.scale.x));
	};

	this.player.hasCoolDown = function() {
		return !(game.time.now > player.abilityCooldown);
	};

	this.player.hasMoveLock = function() {
		return player.moveLock;
	};

	this.player.hasAbilitySwap = function() {
		return game.physics.arcade.overlap(player, player.newAbility);
	};
	
	this.player.hasFreeAbilitySlot = function() {
		if (player.abilityOne == null)
			return true;
		else if (player.abilityTwo == null && player.amountOfAbilities == 2)
			return true;
		else
			return false;
	};
	
	/**
	 * Returns 0 if no empty slot 
	 */
	this.player.getFirstEmptyAbility = function() {
		if (player.abilityOne == null)
			return 1;
		else if (player.abilityTwo == null && player.amountOfAbilities == 2)
			return 2;
		else
			return 0;
	}

	this.player.setCoolDown = function(factor = 1) {
		player.abilityCooldown = game.time.now + player.coolDownTime * factor;
	};

	this.player.setMoveLock = function(bool) {
		player.moveLock = bool;
	};

	this.player.setAbilitySwap = function(ability) {
		player.newAbility = ability;
		if (player.hasFreeAbilitySlot())
			player.swapAbility(player.getFirstEmptyAbility());
	};

	this.player.swapAbility = function(key) {
		// TODO: Change how swapping works?
		// At the moment we can't swap any ability if one button has it already
		if (!player.hasFreeAbilitySlot())
			player.setCoolDown(0.5);
		var tempAbility;
		if (key == 1) {
			tempAbility = player.abilityOne;
			player.abilityOne = player.newAbility.name;
		}
		else if (key == 2) {
			tempAbility = player.abilityTwo;
			player.abilityTwo = player.newAbility.name;
		}
		
		//Updating the buttons shown on screen through the callback function
		updateAbilityTexture(key, player.newAbility.name);
   
		if (tempAbility == null) {
			player.newAbility.kill();
		}
		else {
			player.newAbility.loadTexture(tempAbility);
			player.newAbility.name = tempAbility;
			player.newAbility.key = tempAbility;	
		}
		
		
		
		player.swapCooldown = game.time.now + player.coolDownTime * 0.5;

	};

	this.player.canSwap = function() {

		if ((game.time.now > player.swapCooldown) && ( player.hasAbilitySwap() )) {
			if (!(player.abilityOne == player.newAbility.name || player.abilityTwo == player.newAbility.name)) {
				return (player.body.onFloor());
			}
		}
		return false;
	};



	this.player.death = function() {

		// TODO: Add death animations/events
		
		killEnemy(player);
		//player.enableBody = false;
		//game.state.restart();
		//player.spawn();
		
		// check if this solves bug in backlog on stomping if dying.
		player.isStomping = false; 
		
	};

	this.player.spawn = function() {

		spawnGroup.forEach(function(spawnPoint) {

			player.reset(spawnPoint.x, spawnPoint.y);

		}, this);

	};

	return this.player;

}
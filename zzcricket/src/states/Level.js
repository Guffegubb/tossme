var enemy1;


Game.Level = function(game) {};

var map;
var layer;

var player;
var controls = {};
var playerSpeed = 150;


var button;
var drag;

var shootTime = 0;
var nuts;

var respawn;

var playerXP = 0;
var gameXPsteps = 15;
var playerLevel = 0;

Game.Level.prototype = {

  // in tutorial 9 he adds game as a parameter to create:function, something with being able to use both game and this. "sometiumes it doesnt work"..
  create: function(game) {
    this.stage.backgroundColor = '#3A5963';

    this.physics.arcade.gravity.y = 1000;

    // TODO: ??
    respawn = game.add.group();

    map = this.add.tilemap('map');
    map.addTilesetImage('tileset', 'tileset');


    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    map.setCollisionBetween(0, 4);

    map.setTileIndexCallback(7, this.getCoin, this);
    map.setTileIndexCallback(6, this.spawn, this);

    map.setTileIndexCallback(9, this.speedPowerup, this);

    map.createFromObjects('Object Layer 1', 8, '', 0, true, false, respawn);

    player = new Player(game, 200, 200);
    this.physics.arcade.enable(player);
    this.camera.follow(player);

    // ugly code that solves spawn problem yaaaay
    //this.spawn();

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up: this.input.keyboard.addKey(Phaser.Keyboard.W),
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),

    };

    button = this.add.button(this.world.centerX - 95, this.world.centerY + 200, 'buttons', function() {
      console.log('pressed');
    }, this, 2, 1, 0);

    button.fixedToCamera = true;


    // make an object draggable by the mouse. 
    drag = this.add.sprite(player.x, player.y, 'drag');
    drag.anchor.setTo(0.5, 0.5);
    drag.inputEnabled = true;
    drag.input.enableDrag(true);


    enemy1 = new EnemyBird(0, game, player.x + 400, player.y - 200);


    nuts = game.add.group();
    nuts.enableBody = true;
    nuts.physicsBodyType = Phaser.Physics.ARCADE;
    nuts.createMultiple(5, 'nut');
    nuts.setAll('anchor.x', 0.5);
    nuts.setAll('anchor.y', 0.5);

    nuts.setAll('scale.x', 0.5);
    nuts.setAll('scale.y', 0.5);

    nuts.setAll('outOfBoundsKill', true);
    nuts.setAll('checkWorldBounds', true);

  },

  update: function() {
    this.physics.arcade.collide(player, layer);

    this.physics.arcade.collide(player, enemy1.bird, this.resetPlayer);


    player.move("stop");

    playerLevel = Math.log(playerXP, gameXPsteps);
    console.log('Level: ' + Math.floor(playerLevel));

    if (controls.right.isDown) {
      player.move("right");
    }

    if (controls.left.isDown) {
      player.move("left");
    }

    if (controls.up.isDown) {
      player.move("jump");
    }



    //vid 10
    // this creates a bug when shooting is introduced, can get killed when touching where the bird used to be before dying
    //commented this and added the fix further up. commented as vid 12, top of update function. 
    //if(checkOverlap(player,enemy1.bird)){
    //  
    //  this.resetPlayer();
    //}


    if (controls.shoot.isDown) {
      this.shootNut();
    }

    if (checkOverlap(nuts, enemy1.bird)) {
      enemy1.bird.kill();
    }

  },
  resetPlayer: function() {
    player.reset(100, 560)
  },

  spawn: function() {

    respawn.forEach(function(spawnPoint) {



      player.reset(spawnPoint.x, spawnPoint.y);

    }, this)

  },


  // tutorial 7 - but think from the lessmilk tutorial had a better way of removing coins than this one, check 2d platformer (clatformer) code
  getCoin: function() {
    map.putTile(-1, layer.getTileX(player.x), layer.getTileY(player.y));

    playerXP += 15;
  },

  speedPowerup: function() {
    // TODO: Remove in other fashion to avoid bugs
    map.putTile(-1, layer.getTileX(player.x), layer.getTileY(player.y));
    
    player.speedBoost(this, speedFactor = 1.3, 5); // Add duration : 3 after testing default parameters
    
    //playerSpeed += 50;

    // create a timer for 2 seconds, after which speed will decrease to return to normal
    /*this.time.events.add(Phaser.Timer.SECOND * 2, function() {
      playerSpeed -= 50;
    })
    */
  },


  shootNut: function() {
    if (this.time.now > shootTime) {
      nut = nuts.getFirstExists(false);
      if (nut) {
        nut.reset(player.x, player.y);
        nut.body.velocity.y = -700;
        shootTime = this.time.now + 600;

        // vid 15. For testing purposes, should not get xp just for shooting normally.
        playerXP += 15;

      }
    }
  }

}

// vid 10
function checkOverlap(spriteA, spriteB) {

  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();
  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
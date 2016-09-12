var enemy1;


Game.Level = function(game) {};

var map;
var layer;

var player;
var controls = {};

var button;
var drag;

var projectiles;

// TODO: Do we need this? Other ways of implementing?
var respawn;

Game.Level.prototype = {

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

    // Set a function call when object collides with this tile
    map.setTileIndexCallback(7, this.getCoin, this);
    map.setTileIndexCallback(6, this.spawn, this);

    map.setTileIndexCallback(9, this.speedPowerup, this);

    map.createFromObjects('Object Layer 1', 8, '', 0, true, false, respawn);

    player = new Player(game, 200, 200);
    this.physics.arcade.enable(player);
    this.camera.follow(player);

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


    enemy1 = new EnemyBird(0, game, player.x + 400, player.y);
  },

  update: function() {
    this.physics.arcade.collide(player, layer);

    this.physics.arcade.collide(player, enemy1.bird, this.resetPlayer);

    player.move("stop");
    
    if (controls.right.isDown) {
      player.move("right");
    }

    if (controls.left.isDown) {
      player.move("left");
    }

    if (controls.up.isDown) {
      player.move("jump");
    }
    if (controls.shoot.isDown) {
      projectiles = player.shoot(this);
    }

  
    if (projectiles) {
      for (i in projectiles.children) {
        if (checkOverlap(projectiles.children[i], enemy1.bird)) {
          enemy1.bird.kill();
        }
      }
    }
   

  },
  
  killbird: function() {
    console.log("they collided");
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

  },

  speedPowerup: function() {
    // TODO: Remove in other fashion to avoid bugs
    map.putTile(-1, layer.getTileX(player.x), layer.getTileY(player.y));
    
    player.speedBoost(this, speedFactor = 1.3, 5); // Add duration : 3 after testing default parameters
    
    // create a timer for 2 seconds, after which speed will decrease to return to normal
    /*this.time.events.add(Phaser.Timer.SECOND * 2, function() {
      playerSpeed -= 50;
    })
    */
  },

}

function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();
  return Phaser.Rectangle.intersects(boundsA, boundsB);
}

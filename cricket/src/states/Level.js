
Game.Level = function(game) {};

var map;
var layer;

var player;


// Groups and object readers
var respawn;
var coinGroup;

var coinReader;

Game.Level.prototype = {

    
    create: function(game) {
        
        //
        coinReader = game.add.group();
        coinGroup = game.add.group();
        var singleCoin;
        
        
        
        // Initialize map and tilesets
        this.stage.backgroundColor = '#3A5963';
      
        map = this.add.tilemap('map');
        map.addTilesetImage('tileset', 'tileset');
        layer = map.createLayer('Tile Layer 1');
        
        layer.resizeWorld();
        map.setCollisionBetween(0, 4);
        
        map.createFromObjects('spawn', 8, '', 0, true, false, respawn);
        map.createFromObjects('coins', 7, '', 0, true, false, coinReader);
        
        // the so called ful-lösning
        coinReader.forEach(function(item) {
            singleCoin = new Coin(game, item);
            coinGroup.add(singleCoin);
        }, this);
        
        
        
        
        this.physics.arcade.gravity.y = 1000;
        var playerProperties = {
            // TODO: implement without hardcoded number
            x : 122,
            y : 500,
            playerSpeed : 150,
            jumpHeight : 600,
        }
        
        player = new Player(game, playerProperties);
        this.camera.follow(player);
        
        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
        };
    
    },
    
    
    update: function(game) {
        
        // Adding all collisions
        this.physics.arcade.collide(player, layer);
        
        coinGroup.forEach(function(item) {
            game.physics.arcade.overlap(player, item, function() { item.destroySprite() });
        }, this);
        
        
        // EndOf adding all collisions
        
        
        // Checking for player movement
        
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
        
        // EndOf checking player movement
        
    
        
    },
    
   
}


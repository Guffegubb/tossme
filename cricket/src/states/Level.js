
Game.Level = function(game) {};

var map;
var layer;
var layer2;

var player;

var respawn;
var coins;

var power;

Game.Level.prototype = {

    
    create: function(game) {
        
        // Object layers
        var coinGroup = game.add.group();
        // End of object layers
        
        this.stage.backgroundColor = '#3A5963';
        
        // ...
        respawn = game.add.group();
        coins = game.add.group();
        power = game.add.group();
        
       
        // Initialize map and tilesets
        map = this.add.tilemap('map');
        map.addTilesetImage('tileset', 'tileset');
        layer = map.createLayer('Tile Layer 1');
        
        // Object layers
        //map.createFromObjects('coins', 9, 'tileset', 0, true, false, coinGroup);
        //coinGroup.callAll('animations.add', 'animations', 'spin', [6], 10, true);
        //coinGroup.callAll('animations.play', 'animatons', 'spin');
        // End of object layers
        
        
        layer.resizeWorld();
        map.setCollisionBetween(0, 4);
        //map.createFromObjects('Object Layer 1', 8, '', 0, true, false, respawn);
        //map.createFromObjects('Object Layer 1', 7, '', 0, true, false, coins);
        //map.createFromObjects('Object Layer 1', 9, '', 0, true, false, power);
        
        // Object layers
        map.createFromObjects('spawn', 8, '', 0, true, false, respawn);
        map.createFromObjects('coins', 7, '', 0, true, false, coinGroup);
        
        coinGroup.forEach(function(item) {
           //item.visible = true;
           //console.log(item.x);
           item = game.add.sprite(item.x, item.y, 'bird');
            //item.body.velocity.x = -120;
        }, this);
        
        // End of object layers
        
        
        this.physics.arcade.gravity.y = 1000;
        var properties = {
            // TODO: implement without hardcoded number
            x : 122,
            y : 500,
            playerSpeed : 150,
            jumpHeight : 600,
        }
        
        player = new Player(game, properties);
        this.camera.follow(player);
        
        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
        };
    
    },
    
    
    update: function() {
        this.physics.arcade.collide(player, layer);
        
        
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
        
    },
}


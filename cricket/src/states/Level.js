Game.Level = function(game) {};

var map;
var layer;
// var backgroundLayer;

var controls;
var player;
var abilityOneSprite;
var abilityTwoSprite;
var textOne;
var textTwo;

// Groups and object readers
var spawnGroup;
var coinGroup;
var breakableGroup;
var abilityGroup;
var lethalGroup;
var goalGroup;
var groups; 

/*
var coinReader;
var breakableReader;
var abilityReader;
var groupReader;
var singleCoin;
var singleBreakable;
var singleAbility;
*/

Game.Level.prototype = {


    create: function(game) {

        // Initialize map and tilesets
        this.stage.backgroundColor = '#9CD5E2';

        map = this.add.tilemap('map');
        map.addTilesetImage('tileset', 'tileset');
        map.addTilesetImage('enemyTileset', 'enemyTileset');
        layer = map.createLayer('Tile Layer 1');
        // backgroundLayer = map.createLayer('Background Layer');

        layer.resizeWorld();
        map.setCollisionBetween(2, 4);
        
             //
      //  groupReader = game.add.group();
     //   coinReader = game.add.group();
        coinGroup = game.add.group();
     //   breakableReader = game.add.group();
        breakableGroup = game.add.group();
      //  abilityReader = game.add.group();
        abilityGroup = game.add.group();
        
        //added this sunday
        spawnGroup = game.add.group();
        lethalGroup = game.add.group();
        goalGroup = game.add.group();
        
        
        var objectLayers = ['spawn', 'pickups', 'breakable', 'lethalBlocks', 'supers', 'goal'];

        var objectsInLayer = [  
            ['spawn'], 
            ['diamond', 'star'], 
            ['breakable'], 
            ['lava', 'water', 'cactus'], 
            ['highJump', 'longJump', 'stomp', 'shoot'], 
            ['goal']
        ];
        
        
        
        // This is what I added sunday night instead of old way of creating objects.
        // groups need to have the groups in the same order as the objectLayers array above for this solution to work.
        groups = [spawnGroup, coinGroup, breakableGroup, lethalGroup, abilityGroup, goalGroup];
      
        
        for (var i = 0; i < objectLayers.length; i++) {
            groups[i].enableBody = true;
            for (var j = 0; j < objectsInLayer[i].length; j++) {
                
                map.createFromObjects(objectLayers[i], objectsInLayer[i][j], objectsInLayer[i][j], 0, true, false, groups[i]);
            }}
        
        /* TODO: Implement custom class? May be useful to connect the objects to their respective .js class file.
        
        // Phaser.Tilemap.createFromObjects(name, gid, key, frame, 
                                    exists, autoCull, group, CustomClass, adjustY)
        // arg object CustomClass (optional) = Phaser.Sprite
            If you wish to create your own class, rather than Phaser.Sprite, 
            pass the class here. Your class must extend Phaser.Sprite and have 
            the same constructor parameters.
        */
        
        
        
        /*
        map.createFromObjects('spawn', 'spawn', 'spawn', 0, true, false, spawnGroup);
        map.createFromObjects('pickups', 'diamond', 'diamond', 0, true, false, coinGroup);
        map.createFromObjects('breakable', 'breakable', 'breakable', 0, true, false, breakableGroup);
      
       // var abilityList = ['highJump', 'longJump', 'stomp', 'shoot'];
       // creates all ability blocks
       for (var a = 0; a < objectsInLayer[4].length;a++ )
            map.createFromObjects('supers', objectsInLayer[4][a], objectsInLayer[4][a], 0, true, false, abilityGroup);
        
       // create all different lethal blocks 
        for (var a = 0; a < objectsInLayer[3].length;a++ )
            map.createFromObjects('lethalBlocks', objectsInLayer[3][a], objectsInLayer[3][a], 0, true, false, lethalGroup);
        
        map.createFromObjects('goal', 'goal', 'goal', 0, true, false, goalGroup);
        */
       
       // also added this sunday
        // removes gravity and makes immovable for all objects created.
        for (var g = 0; g < groups.length; g++) {
            groups[g].forEach(function(item) {
                item.body.allowGravity = false;
                item.body.immovable = true;
        }, this); 
        }
        //;
      /*
         createAllObjects = function() {
            var temp;
            
            for (var i = 0; i < objectLayers.length; i++) {

                for (var j = 0; j < objectsInLayer[i].length; j++) {
                    map.createFromObjects(objectLayers[i], objectsInLayer[i][j], '', 0, true, false, groupReader)
                    groupReader.forEach(function(item) {
                        
                        
                        if (objectLayers[i] == 'spawn') {
                            console.log("Can't create spawn yet");
                        }
                        else if (objectLayers[i] == 'pickups') {
                            temp = new Coin(game, item);
                            coinGroup.add(temp);
                        }
                        else if (objectLayers[i] == 'breakable') {
                            temp = new Breakable(game, item);
                            breakableGroup.add(temp);
                        }
                        else if (objectLayers[i] == 'lethalBlocks') {
                            console.log("Can't create lethalBlocks yet");
                        }
                        else if (objectLayers[i] == 'supers') {
                            temp = new Ability(game, item);
                            abilityGroup.add(temp);
                        }
                        else if (objectLayers[i] == 'goal') {
                            console.log("Can't create goal yet");
                        }
                   
                        
                    });
                    groupReader.removeAll();
                }
            }
            
       };
        createAllObjects(objectLayers, objectsInLayer);
        */
        

        this.physics.arcade.gravity.y = 1000;
        var playerProperties = {
            // TODO: implement without hardcoded number
            x: 122,
            y: 500,
            playerSpeed: 200,
            jumpHeight: 400,
        }

        player = new Player(game, playerProperties);
        this.camera.follow(player);
        player.spawn();

        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
            abilityOne: this.input.keyboard.addKey(Phaser.Keyboard.Z),
            abilityTwo: this.input.keyboard.addKey(Phaser.Keyboard.X),
        };
        
        // Shows current abilities
        abilityOneSprite = game.add.sprite(10, 500, player.abilityOne);
        abilityOneSprite.fixedToCamera = true;
        
        abilityTwoSprite = game.add.sprite(100, 500, player.abilityTwo);
        abilityTwoSprite.fixedToCamera = true;
        
        // Can also add style as last inparameter after (x, y, "text", 'style')
        textOne = game.add.text(Math.floor(abilityOneSprite.x + abilityOneSprite.width/2), 
                                Math.floor(abilityOneSprite.y + abilityOneSprite.height/2), "Z");
        textOne.fixedToCamera = true;
        
        textTwo = game.add.text(Math.floor(abilityTwoSprite.x + abilityTwoSprite.width/2), 
                                Math.floor(abilityTwoSprite.y + abilityTwoSprite.height/2), "X");
        textTwo.fixedToCamera = true;
    
    
        
       
        
        
    },


    update: function(game) {

        // Adding all collisions
        this.physics.arcade.collide(player, layer);
        this.physics.arcade.collide(player, breakableGroup);
        

        // Changed this when trying new way of creating coin, if reverting bring back the commented line.
        coinGroup.forEach(function(item) {
            game.physics.arcade.overlap(player, item, function() {
                //item.destroySprite()
                // could probably work by created destroySprite(item) function, not nested inside Coin = function..
                item.kill();
            });
        }, this);

        this.physics.arcade.collide(player, lethalGroup, player.death);
        
        goalGroup.forEach(function(item) {
           game.physics.arcade.overlap(player, item, function() {
             console.log("victory?");  
           }); 
        });

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

        if (controls.abilityOne.isDown) {
            player.callAbility(1);
        }

        if (controls.abilityTwo.isDown) {
            player.callAbility(2);
        }


        // EndOf checking player movement



    },


}

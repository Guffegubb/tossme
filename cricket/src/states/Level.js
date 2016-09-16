Game.Level = function(game) {};

var map;
var layer;
// var backgroundLayer;

var player;
var abilityOneSprite;
var abilityTwoSprite;
var textOne;
var textTwo;

// Groups and object readers
var respawn;
var coinGroup;
var breakableGroup;
var abilityGroup;

var coinReader;
var breakableReader;
var abilityReader;
var groupReader;
var singleCoin;
var singleBreakable;
var singleAbility;


Game.Level.prototype = {


    create: function(game) {

        //
        groupReader = game.add.group();
        coinReader = game.add.group();
        coinGroup = game.add.group();
        breakableReader = game.add.group();
        breakableGroup = game.add.group();
        abilityReader = game.add.group();
        abilityGroup = game.add.group();




        // Initialize map and tilesets
        this.stage.backgroundColor = '#9CD5E2';

        map = this.add.tilemap('map');
        map.addTilesetImage('tileset', 'tileset');
        map.addTilesetImage('enemyTileset', 'enemyTileset');
        layer = map.createLayer('Tile Layer 1');
        // backgroundLayer = map.createLayer('Background Layer');

        layer.resizeWorld();
        map.setCollisionBetween(2, 4);

        var objectLayers = ['spawn', 'pickups', 'breakable', 'lethalBlocks', 'supers', 'goal'];

        var objectsInLayer = [
            ['spawn'],
            ['diamond', 'star'],
            ['breakable'],
            ['lava', 'water', 'cactus'],
            ['highJump', 'longJump', 'stomp', 'shoot'],
            ['goal']
        ];

        //;

        //map.createFromObjects('breakable', 'breakable', 'breakable', 0, true, false, breakableGroup);

        // Function to create all objects from the different object layers in Tiled. 
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
        createAllObjects();


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
        textOne = game.add.text(Math.floor(abilityOneSprite.x + abilityOneSprite.width / 2),
            Math.floor(abilityOneSprite.y + abilityOneSprite.height / 2), "Z");
        textOne.fixedToCamera = true;

        textTwo = game.add.text(Math.floor(abilityTwoSprite.x + abilityTwoSprite.width / 2),
            Math.floor(abilityTwoSprite.y + abilityTwoSprite.height / 2), "X");
        textTwo.fixedToCamera = true;




    },


    update: function(game) {

        // Adding all collisions
        this.physics.arcade.collide(player, layer);
        this.physics.arcade.collide(player, breakableGroup);

        coinGroup.forEach(function(item) {
            game.physics.arcade.overlap(player, item, function() {
                item.destroySprite()
            });
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

        if (controls.abilityOne.isDown) {
            player.callAbility(1);
        }

        if (controls.abilityTwo.isDown) {
            player.callAbility(2);
        }


        // EndOf checking player movement



    },


}
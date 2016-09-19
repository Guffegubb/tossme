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


        coinGroup = game.add.group();
        breakableGroup = game.add.group();
        abilityGroup = game.add.group();
        spawnGroup = game.add.group();
        lethalGroup = game.add.group();
        goalGroup = game.add.group();

        // groups need to have the groups in the same order as the
        // objectLayers array above for this solution to work.
        groups = [
            spawnGroup,
            coinGroup,
            breakableGroup,
            lethalGroup,
            abilityGroup,
            goalGroup
        ];

        var objectLayers = [
            'spawn',
            'pickups',
            'breakable',
            'lethalBlocks',
            'supers',
            'goal'
        ];

        var objectsInLayer = [
            ['spawn'],
            ['diamond', 'star'],
            ['breakable'],
            ['lava', 'water', 'cactus'],
            ['highJump', 'longJump', 'stomp', 'shoot'],
            ['goal']
        ];




        // TODO: Comment this
        for (var i = 0; i < objectLayers.length; i++) {
            groups[i].enableBody = true;
            for (var j = 0; j < objectsInLayer[i].length; j++) {

                map.createFromObjects(objectLayers[i], objectsInLayer[i][j], objectsInLayer[i][j], 0, true, false, groups[i]);
            }
        }

        /* TODO: Implement custom class? May be useful to connect the objects to their respective .js class file.
        
        // Phaser.Tilemap.createFromObjects(name, gid, key, frame, 
                                    exists, autoCull, group, CustomClass, adjustY)
        // arg object CustomClass (optional) = Phaser.Sprite
            If you wish to create your own class, rather than Phaser.Sprite, 
            pass the class here. Your class must extend Phaser.Sprite and have 
            the same constructor parameters.
        */
        // http://phaser.io/examples/v2/sprites/extending-sprite-demo-1

        // removes gravity and makes immovable for all objects created.
        for (var g = 0; g < groups.length; g++) {
            groups[g].forEach(function(item) {
                item.body.allowGravity = false;
                item.body.immovable = true;
            }, this);
        }
        //;



        this.physics.arcade.gravity.y = 1000;
        var playerProperties = {
            // TODO: implement without hardcoded numbers
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
            abilityThree: this.input.keyboard.addKey(Phaser.Keyboard.C),
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

        breakableGroup.forEach(function(item) {
                game.physics.arcade.collide(player, item, function() {
                    if (player.isStomping) {
                        destroySprite(item);
                    }
                })
            })
            //  this.physics.arcade.collide(player, breakableGroup;)


        coinGroup.forEach(function(item) {
            game.physics.arcade.overlap(player, item, function() {
                destroySprite(item);
            });
        }, this);

        this.physics.arcade.collide(player, lethalGroup, player.death);

        goalGroup.forEach(function(item) {
            game.physics.arcade.overlap(player, item, function() {
                console.log("victory?");
            });
        });

        abilityGroup.forEach(function(item) {
            game.physics.arcade.overlap(player, item, function() {
                player.setAbilitySwap(item);
            });
        });

        // Do something with this in another function to change the sprites when 
        // picking up a new ability
        //abilityOneSprite = game.add.sprite(abilityOneSprite.x, abilityOneSprite.y, player.abilityOne);

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
            player.callAbility(1, function() {
                abilityOneSprite = game.add.sprite(10, 500, player.abilityOne);
                abilityOneSprite.fixedToCamera = true;
            });
        }

        if (controls.abilityTwo.isDown) {
            player.callAbility(2, function() {
                abilityTwoSprite = game.add.sprite(100, 500, player.abilityTwo);
                abilityTwoSprite.fixedToCamera = true;
            });
        }

        if (controls.abilityThree.isDown) {
            player.callAbility(3, function() {});
        }


        // EndOf checking player movement


        // Trying a callback function for changing sprites

        //this.something();


    },

    something: function() {
        console.log("callback is working");
    }


}

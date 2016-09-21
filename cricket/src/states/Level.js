Game.Level = function(game) {
    this.game = game;
};

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



var projectiles;



Game.Level.prototype = {


    create: function(game) {

        projectiles = declareProjectile(game, projectiles);

        // Initialize map and tilesets
        this.stage.backgroundColor = '#9CD5E2';


        map = this.add.tilemap(chosenMap);
        map.addTilesetImage('tileset', 'tileset');
        map.addTilesetImage('enemyTileset', 'enemyTileset');
        layer = map.createLayer('Tile Layer 1');
        // backgroundLayer = map.createLayer('Background Layer');

        layer.resizeWorld();
        map.setCollisionBetween(2, 4, true, layer);

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
            x: -100,
            y: -100,
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
        // TODO: Look at this, the reason why a picture is loaded in and then
        // later set to a picture from the player is because if it is empty
        // we need to create a texture to get the text to be on the correct place
        abilityOneSprite = game.add.sprite(10, 500, 'shoot');
        abilityOneSprite.fixedToCamera = true;

        abilityTwoSprite = game.add.sprite(100, 500, 'shoot');
        abilityTwoSprite.fixedToCamera = true;


        textOne = addAbilityText(this, abilityOneSprite, 'Z');
        textTwo = addAbilityText(this, abilityTwoSprite, 'X');

        abilityOneSprite.loadTexture(player.abilityOne);
        abilityTwoSprite.loadTexture(player.abilityTwo);

        createExitButton(game);

    },


    update: function(game) {
        // Adding all collisions
        this.physics.arcade.collide(player, layer);

        breakableGroup.forEach(function(item) {
            game.physics.arcade.collide(player, item, function() {
                if (player.isStomping && !player.body.touching.up) {
                    destroySprite(item);
                }
            })
        })


        coinGroup.forEach(function(item) {
            game.physics.arcade.overlap(player, item, function() {
                destroySprite(item);
            });
        }, this);

        this.physics.arcade.collide(player, lethalGroup, player.death);

        goalGroup.forEach(function(item) {
            game.physics.arcade.overlap(player, item, function() {
                console.log("victory?");
                // TODO: Add call to some function that adds victory screen before returning to menu.
                exitToMenu(game); // game.state.start('MainMenu');

            });
        });
        var myTimer = 0;

        abilityGroup.forEach(function(item) {
            game.physics.arcade.overlap(player, item, function() {
                blink(player, item);
                player.setAbilitySwap(item);
                myTimer = game.time.now;
            });
        });

        if (game.time.now > myTimer) {
            abilityTwoSprite.alpha = 1;
            abilityOneSprite.alpha = 1;
            abilityGroup.forEach(function(item) {
                item.alpha = 1;
            });
        }



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

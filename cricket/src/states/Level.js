Game.Level = function(game) {
    this.game = game;
    var originalTint;
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
var enemyGroup;
var enemyCollisionGroup;
var groups;


var projectiles;

Game.Level.prototype = {


    create: function(game) {
        
        // All the object music is created here for now
        breakAudio = game.add.audio('breakAudio');
        levelComplete = game.add.audio('levelCompleteAudio');
        
        levelComplete.volume = 0.6;
        
        // Initialize map and tilesets
        this.stage.backgroundColor = '#9CD5E2';


        map = this.add.tilemap(chosenMap);
        map.addTilesetImage('tileset', 'tileset');
        map.addTilesetImage('enemyTileset', 'enemyTileset');
        layer = map.createLayer('Tile Layer 1');
        collisionLayer = map.createLayer('enemyCollisionLayer');
        // backgroundLayer = map.createLayer('Background Layer');

        layer.resizeWorld();
        map.setCollisionBetween(2, 4, true, layer);
        map.setCollisionBetween(0, 2, true, collisionLayer);

        coinGroup = game.add.group();
        breakableGroup = game.add.group();
        abilityGroup = game.add.group();
        spawnGroup = game.add.group();
        lethalGroup = game.add.group();
        goalGroup = game.add.group();
        enemyGroup = game.add.group();
        enemyCollisionGroup = game.add.group();

        // groups need to have the groups in the same order as the
        // objectLayers array above for this solution to work.
        groups = [
            spawnGroup,
            coinGroup,
            breakableGroup,
            lethalGroup,
            abilityGroup,
            goalGroup,
            enemyGroup,
            enemyCollisionGroup
        ];

        var objectLayers = [
            'spawn',
            'pickups',
            'breakable',
            'lethalBlocks',
            'supers',
            'goal',
            'enemies',
            'enemyCollision'
        ];

        var objectsInLayer = [
            ['spawn'],
            ['diamond', 'star'],
            ['breakable'],
            ['lava', 'water', 'cactus'],
            ['highJump', 'longJump', 'stomp', 'shoot'],
            ['goal'],
            ['frog', 'bee'],
            ['collision']
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

            //groups[g].setAll('anchor', 0.5);
        }
        //;

        projectiles = declareProjectile(game, projectiles);
        enemyGroup = initEnemyGroup(game, enemyGroup, null);


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
        originalTint = player.tint;

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
        if (isAlive(player)) {


            // Adding all collisions with layer
            this.physics.arcade.collide(player, layer);
            this.physics.arcade.collide(enemyGroup, layer);
            this.physics.arcade.collide(enemyGroup, collisionLayer);
            //this.physics.arcade.collide(projectiles, layer);

            // TODO: Move all the xGroup.forEach to respective JS files?
            // TODO: we need to check if colliding with one block to the left or right
            // if we want it to destroy when standing halfway on ground and halfway on breakable
            breakableGroup.forEach(function(item) {
                checkBreakableCollision(game, player, item);
                /*
         game.physics.arcade.collide(player, item, function() {
             checkDestruction(game, item);
         */

                // })
            })


            coinGroup.forEach(function(item) {
                game.physics.arcade.overlap(player, item, function() {
                    destroySprite(item);
                });
            }, this);

            this.physics.arcade.collide(player, lethalGroup, player.death);

            goalGroup.forEach(function(item) {
                game.physics.arcade.overlap(player, item, function() {
                    //  console.log("victory?");
                    // TODO: Add call to some function that adds victory screen before returning to menu.
                    //exitToMenu(game); // game.state.start('MainMenu');
                    //game.state.start('Level', true, false);
                    //nextMap(game);
                    //console.log(game.scale.viewportWidth);
                    //console.log(window.innerHeight);
                    //t.fixedToCamera = true;
                    mapComplete(game);
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

            // Trying collide with enemyGroup as we do with enemyTiles
            //this.physics.arcade.collide(player, enemyGroup, player.death);
            //this.physics.arcade.collide(enemyGroup, enemyCollisionGroup, changeDirectionX(enemyGroup.));
            //this.physics.arcade.collide(player, enemyGroup, player.death);
            


            // TODO: Make this solution better if possible (maybe just check active 
            // projectiles)
            enemyGroup.forEach(function(enemyItem) {
                moveEnemy(enemyItem);
                
                // Check collide with projectiles
                projectiles.forEach(function(projectileItem) {
                    // Before checking collide with enemy we check with the layer
                    game.physics.arcade.collide(projectileItem, layer, function() {
                        projectileItem.kill();
                    });
                    
                    game.physics.arcade.overlap(enemyItem, projectileItem, function() {
                        projectileItem.kill();
                        killEnemy(enemyItem);
                    });
                });
                
                // Check collide with player (if alive)
                if (isAlive(enemyItem)) {
                    game.physics.arcade.collide(player, enemyItem, player.death);
                }
                
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
            //   if (isAlive(player)) {
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
            // TODO: Potentially implement so the same thing happens when touching breakableBlock above.
            
            player.checkRoofCollision(game);
            
            // }

        }
        else {
            if (player.y > map.heightInPixels) {
                game.state.restart();
            }
            
            this.physics.arcade.collide(enemyGroup, layer);
            this.physics.arcade.collide(enemyGroup, collisionLayer);
            enemyGroup.forEach(function(enemyItem) {
                moveEnemy(enemyItem);
            });

        }



        // EndOf checking player movement




    },




}
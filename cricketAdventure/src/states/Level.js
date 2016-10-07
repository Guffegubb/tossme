Game.Level = function(game) {
    this.game = game;
  
    var map;
    var layer;
    
    var controls;
    var player;
    var projectiles;
    
    var textOne;
    var textTwo;

    var spawnGroup;
    var goalGroup;
    var lethalGroup;
    var enemyGroup;
    var enemyCollisionGroup;
    var breakableGroup;
    var abilityGroup;

    var groups;
    
    var abilityOneSprite;
    var abilityTwoSprite;
    var abilityFaderOne;
    var abilityFaderTwo;
    
    // Used to prevent death upon changing map
    var changingMap
    
};


Game.Level.prototype = {

    create: function(game) {
        
        
        changingMap = false;
        
        // All the object music is created here for now
        breakAudio = game.add.audio('breakAudio');
        levelComplete = game.add.audio('levelCompleteAudio');
        levelComplete.volume = 0.6;
        game.sound.mute = true;

        // Initialize map and tilesets
        this.stage.backgroundColor = '#FFFFFF';
        
        map = this.add.tilemap(chosenMap);
        map.addTilesetImage('tileset', 'tileset');
        map.addTilesetImage('enemyTileset', 'enemyTileset');
        collisionLayer = map.createLayer('Enemy Collision Layer')
        //collisionLayer = map.createLayer('enemyCollisionLayer');
        backgroundLayer = map.createLayer('Background Layer');
        layer = map.createLayer('Tile Layer 1');

        layer.resizeWorld();
        map.setCollisionBetween(2, 4, true, layer);
        map.setCollisionBetween(0, 2, true, collisionLayer);
        
        breakableGroup = game.add.group();
        abilityGroup = game.add.group();
        spawnGroup = game.add.group();
        lethalGroup = game.add.group();
        goalGroup = game.add.group();
        enemyGroup = game.add.group();
        enemyCollisionGroup = game.add.group();

        // variable groups need to have th phaser groups in the same order as the
        // objectLayers array below for this solution to work.
        groups = [
            spawnGroup,
            breakableGroup,
            lethalGroup,
            abilityGroup,
            goalGroup,
            enemyGroup,
            enemyCollisionGroup
        ];

        var objectLayers = [
            'spawn',
            'breakable',
            'lethalBlocks',
            'supers',
            'goal',
            'enemies',
            'enemyCollision'
        ];

        var objectsInLayer = [
            ['spawn'],
            ['breakable'],
            ['lava', 'water', 'spike'],
            ['highJump', 'longJump', 'stomp', 'shoot'],
            ['goal'],
            ['frog', 'bee'],
            ['collision']
        ];

 
        // Code block to create all the objects from the imported map json file.
        // loops over the different groups, and for each
        // creates the different subelements. For example in the group of lethalblocks
        // the spike, lava, and water objects will be created. 
        for (var i = 0; i < objectLayers.length; i++) {
            groups[i].enableBody = true;
            for (var j = 0; j < objectsInLayer[i].length; j++) {
                
                if (map.objects[objectLayers[i]]) {
                    map.createFromObjects(objectLayers[i], objectsInLayer[i][j], 
                    objectsInLayer[i][j], 0, true, false, groups[i]);    
                }
            }
        }


        // removes gravity and makes immovable for all objects created.
        for (var g = 0; g < groups.length; g++) {
            groups[g].forEach(function(item) {
                item.body.allowGravity = false;
                item.body.immovable = true;
            }, this);

        }

        projectiles = declareProjectile(game);
        enemyGroup = initEnemyGroup(game, enemyGroup, null);

        
        // sets the gravity for the game world.
        this.physics.arcade.gravity.y = 1000;
        // Sets the properties for the player
        var playerProperties = {
            x: -100,
            y: -100,
            playerSpeed: 250,
            jumpHeight: 400,
        };

        player = new Player(game, playerProperties);
        this.camera.follow(player);
        player.spawn();


        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
            abilityOne: this.input.keyboard.addKey(Phaser.Keyboard.Z),
            abilityTwo: this.input.keyboard.addKey(Phaser.Keyboard.X),
            muteSound: this.input.keyboard.addKey(Phaser.Keyboard.M),
        };

       
        // Shows current abilities
        
        abilityOneSprite = game.add.sprite(10, windowHeight - 100, 'shoot');
        abilityOneSprite.fixedToCamera = true;

        abilityTwoSprite = game.add.sprite(100, windowHeight - 100, 'shoot');
        abilityTwoSprite.fixedToCamera = true;


        textOne = addAbilityText(this, abilityOneSprite, 'Z');
        textTwo = addAbilityText(this, abilityTwoSprite, 'X');

        abilityOneSprite.loadTexture(player.abilityOne);
        abilityTwoSprite.loadTexture(player.abilityTwo);
        abilityFaderOne = game.add.sprite(abilityOneSprite.x, abilityOneSprite.y, 'abilityFade');
        abilityFaderTwo = game.add.sprite(abilityTwoSprite.x, abilityTwoSprite.y, 'abilityFade');
        abilityFaderOne.fixedToCamera = true; 
        abilityFaderTwo.fixedToCamera = true;
        abilityFaderOne.alpha = 0;
        abilityFaderTwo.alpha = 0;
        
        createExitButton(game);
        
        
        var fadeScreen = game.add.sprite(0, 0, 'fadeScreen');
        fadeScreen.fixedToCamera = true;
        fadeScreen.alpha = 1;
        fadeScreen = game.add.tween(fadeScreen).to( { alpha: 0 }, 
        2000, Phaser.Easing.Linear.None, true, 0, 0, false);
        
    },


    update: function(game) {
        
        if (isAlive(player)) {

            // Adding all collisions with layer
            this.physics.arcade.collide(player, layer);
            this.physics.arcade.collide(enemyGroup, layer);
            this.physics.arcade.collide(enemyGroup, collisionLayer);
            this.physics.arcade.collide(player, breakableGroup);

            if (player.isStomping)
                checkBreakableCollision(player, breakableGroup);
            
            if (!changingMap) {
                
                this.physics.arcade.collide(player, lethalGroup, function() {
                    if (player.body.touching.down)
                        player.death();
                    else {
                        player.hurt(0.02, 50);
                        player.setMoveLock(true);
                        game.time.events.add(Phaser.Timer.SECOND * 0.3, function() {
                           player.setMoveLock(false); 
                        });
                        player.setCoolDown();
                        player.body.velocity.x -= player.direction() * 400;
                        player.body.velocity.y -= 70;
                    }
                }, null, this); 
            }
            
            goalGroup.forEach(function(item) {
                game.physics.arcade.overlap(player, item, function() {
                    mapComplete(game);
                });
            });
            
            var abilityTimer = 0;
            abilityGroup.forEach(function(item) {
                game.physics.arcade.overlap(player, item, function() {
                    blink(player, item);
                    player.fillAbilitySlot(item);
                    abilityTimer = game.time.now;
                });
            });
            
            if (game.time.now > abilityTimer) {
                abilityTwoSprite.alpha = 1;
                abilityOneSprite.alpha = 1;
                abilityGroup.forEach(function(item) {
                    item.alpha = 1;
                });
            }

            projectiles.forEach(function(projectileItem) {
                // Before checking collide with enemy we check with the layer
                game.physics.arcade.collide(projectileItem, layer, function() {
                    projectileItem.kill();
                });

                enemyGroup.forEach(function(enemyItem) {
                    moveEnemy(enemyItem);

                    game.physics.arcade.overlap(enemyItem, projectileItem, function() {
                        projectileItem.kill();
                        killBody(enemyItem);
                    });

                    if (isAlive(enemyItem) && !changingMap) {
                        game.physics.arcade.collide(player, enemyItem, player.death);
                    }

                });

            });

            
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
                player.callAbility(game, 1);
            }

            if (controls.abilityTwo.isDown) {
                player.callAbility(game, 2);
            }
            
            if (controls.muteSound.isDown) {
                if (preventMultiMute) {
                    game.sound.mute ^= true;
                    preventMultiMute = false;
                }
                
            }
            
            if (controls.muteSound.isUp) {
                preventMultiMute = true;
            }
            
            player.checkRoofCollision(game);

        }
        
        // This else executes if the player is dead
        else {


            this.physics.arcade.collide(enemyGroup, layer);
            this.physics.arcade.collide(enemyGroup, collisionLayer);
            enemyGroup.forEach(function(enemyItem) {
                moveEnemy(enemyItem);
            });
            
            restartMap(game);

        }
        
    },
}
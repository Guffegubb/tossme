Game.Preloader = function(game) {

this.game = game;    
    
};

var maps = [];

Game.Preloader.prototype = {
    preload: function() {

        // Change this image
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.time.advancedTiming = true;
        this.load.setPreloadSprite(this.preloadBar);

        // Load all assets
        //TODO: Double-check that all assets are used

        // load assets for main menu
        this.load.image('playButton', 'assets/player/pinkPlayerJump.png'); // this one should be changed
        this.load.image('titlescreen', 'assets/menu/titlescreen.png');
        
        // load maps and tilesets
        this.load.tilemap('map', 'assets/maps/level1.1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('map2', 'assets/maps/level1.2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('map3', 'assets/maps/level2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('map4', 'assets/maps/level3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset', 'assets/spritesheets/TileSpritesheet.png');
        this.load.image('enemyTileset', 'assets/spritesheets/EnemySpritesheet.png')
        
        maps.push('map');
        maps.push('map2');
        maps.push('map3');
        maps.push('map4');
        
        // load abilities
        this.load.image('highJump', 'assets/abilities/highJump.png');
        this.load.image('longJump', 'assets/abilities/longJump.png');
        this.load.image('shoot', 'assets/abilities/shoot.png');
        this.load.image('stomp', 'assets/abilities/stomp.png');
        
        // load blocks
        this.load.image('breakable', 'assets/blocks/breakable.png');
        this.load.image('lava', 'assets/blocks/lava.png');
        this.load.image('water', 'assets/blocks/water.png');
        this.load.image('cactus', 'assets/blocks/cactus.png');
        // this.load.image('platform', 'assets/blocks/platform.png');
        
        // load items
        this.load.image('diamond', 'assets/items/diamond.png');
        this.load.image('star', 'assets/items/star.png');
        this.load.image('spawn', 'assets/items/spawnFlag.png');
        this.load.image('goal', 'assets/items/goalFlag.png');
        this.load.image('projectile', 'assets/items/shot.png');
        
        this.load.image('exit', 'assets/items/exit.png');
        
        // load player
        this.load.image('player', 'assets/player/pinkPlayer1.png');
        
    },

    create: function() {

        this.state.start('MainMenu');
    }

};

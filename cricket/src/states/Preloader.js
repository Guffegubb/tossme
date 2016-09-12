Game.Preloader = function(game) {

    // Can the code run properly without this line? 
    // this.preloadBar = null;
};


Game.Preloader.prototype = {
    preload: function() {

        // Change this image
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.time.advancedTiming = true;
        this.load.setPreloadSprite(this.preloadBar);

        // Load all assets
        //TODO: Double-check that all assets are used

        this.load.tilemap('map', 'assets/maps/objectTest.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset', 'assets/tileset.png');

        this.load.image('player', 'assets/player/pinkPlayer1.png');
        this.load.image('playButton', 'assets/player/pinkPlayerJump.png');
        //this.load.spritesheet('buttons', 'assets/buttons.png', 193,71);
        // this.load.image('drag', 'assets/drag.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('projectile', 'assets/nut.png');
        this.load.image('titlescreen', 'assets/titlescreen.png');
        //this.load.image('button', 'assets/button.png');
    },

    create: function() {

        this.state.start('MainMenu');
    }

};

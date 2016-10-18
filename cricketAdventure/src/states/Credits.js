Game.Credits = function(game) {

    this.game = game;
};


Game.Credits.prototype = {
    create: function(game) {

        // resizes the game to the original size. 
        var width = windowWidth;
        var height = windowHeight;
        this.stage.backgroundColor = '#FFFFFF'; // might have to change this later when switching titlescreen
        this.game.width = width;
        this.game.height = height;
        this.game.canvas.width = width;
        this.game.canvas.height = height;
        this.game.world.setBounds(0, 0, width, height);
        this.game.scale.width = width;
        this.game.scale.height = height;
        this.game.camera.setSize(width, height);
        this.game.camera.setBoundsToWorld();
        this.game.renderer.resize(width, height);

        // Shows the winning screen
        var winningScreen = game.add.sprite(0, 0, 'winningScreen');
        winningScreen.fixedToCamera = true;
        winningScreen.alpha = 1;

        // fades in the title screen
        this.intro = this.game.add.sprite(this.world.centerX, this.world.centerY, 'titlescreen');
        this.intro.anchor.setTo(0.5);
        this.intro.alpha = 0;



        game.time.events.add(Phaser.Timer.SECOND * 2, function() {
            this.introTween = this.game.add.tween(this.intro).to({
                alpha: 1
            }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
            
            this.introTween.onComplete.add(function() {
                this.state.start('MainMenu');
            }, this);
            
        }, this);

    },

}
Game.Credits = function(game) {

    this.game = game;
};


Game.Credits.prototype = {
    create: function(game) {

        // resizes the game to the original size. 
        var width = windowWidth;
        var height = windowHeight;
        this.stage.backgroundColor = '#000000'; // might have to change this later when switching titlescreen
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

        // fades in the title screen
        this.intro = this.game.add.sprite(this.world.centerX, this.world.centerY, 'titlescreen');
        this.intro.anchor.setTo(0.5);
        this.intro.alpha = 0;
        this.introTween = this.game.add.tween(this.intro).to({
            alpha: 1
        }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);

        this.textObj = "You beat all the levels!"
        this.styleObj = {
            font: "64px Comic Sans",
            fill: "#413FAD",
            align: "center"
        };
        this.creditsText = game.add.text(game.world.centerX - 300, game.world.centerY, 
        this.textObj, this.styleObj);
        this.creditsText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        // fades in the credits text. After a few seconds, returns the player to the main menu
        this.creditsText.alpha = 0;
        this.textTweenIn = this.game.add.tween(this.creditsText).to({
            alpha: 1
        }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.textTweenIn.onComplete.add(function() {
            this.textTweenOut = this.game.add.tween(this.creditsText).to({
                alpha: 0
            }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
            this.textTweenOut.onComplete.add(function() {
                this.state.start('MainMenu');
            }, this);
        }, this)

    },

}
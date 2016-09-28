Game.Credits = function(game) {

    this.game = game;
};


Game.Credits.prototype = {
    create: function(game) {
    
    // TODO: move this and from mainmenu into separate function. 
     var width = 1200;
        var height = 600;
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
    
     this.intro = this.game.add.sprite(this.world.centerX, this.world.centerY, 'polarBear');
        this.intro.anchor.setTo(0.5);
        this.intro.alpha = 0;
        this.introTween = this.game.add.tween(this.intro).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.introTween.onComplete.add(function(Game) {
           this.state.start('MainMenu');
        }, this);
        
        this.creditsText;
        // TODO: Implement same tween as above but with text.
    
        /*game.time.events.add(Phaser.Timer.SECOND * 3, function() {
            console.log("nu har det gått 3 sekunder");
            this.state.start('MainMenu');
        }, this);
    */
    },

}
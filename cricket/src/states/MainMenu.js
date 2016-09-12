Game.MainMenu = function(game) {

};


Game.MainMenu.prototype = {
    create: function(game) {
        
        var titlescreen = game.add.sprite(game.world.centerX, game.world.centerY-192, 'titlescreen');
        titlescreen.anchor.setTo(0.5, 0.5);
        
        // TODO: second inparameter is name on button, change when implementing a new button image.
        this.createButton(game, '', game.world.centerX, game.world.centerY+150,
            300, 100, function() {
           this.state.start('Level'); 
        });
        
    },

    update: function(game) {

    },

    createButton: function(game, string, x, y, w, h, callback) {
        var playButton = game.add.button(x, y, 'playButton', callback, this, 2, 1, 0);
        
        playButton.anchor.setTo(0.5, 0.5);
       //playButton.width = w;
    //playButton.height = h;
        
        
        
    }

}
var Game = {};

Game.Boot = function(game) {
    
};

Game.Boot.prototype = {
    init:function(){
        
        // because computer and not multitouch screen
        this.input.maxPointers = 1;
        
        // If true, keeps game from freezing if tabbed out
        this.stage.disableVisibilityChange = false;
    },
    
    preload:function() {
        
        // TODO: Change this image
        this.load.image('preloaderBar', 'assets/menu/preloader.png');
    },
    
    create:function() {
        
        this.state.start('Preloader');
    }
}
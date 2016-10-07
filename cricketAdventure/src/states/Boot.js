var Game = {};

Game.Boot = function(game) {
    
};

Game.Boot.prototype = {
    init:function(){
        
        // Enables only the mouse as cursor, not a multi-touch screen.
        this.input.maxPointers = 1;
        
        // If true, keeps game from freezing if tabbed out
        this.stage.disableVisibilityChange = false;
        
    },
    
    preload:function() {
        
        // loads the image to fade in as the game starts. 
        this.load.image('titlescreen', 'assets/menu/titlescreen.png');
    },
    
    create:function() {
        
        this.state.start('Preloader');
    }
}
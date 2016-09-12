Game.MainMenu = function(game) {
  // "here we will hold all of our global variables"  
};


var titlescreen;

Game.MainMenu.prototype = {
    // "we are gonna need to take in the game parameter just so we can use the game function in our create function"
    create:function(game){
        
        // I changed the positions due to not having the same images as the tutorial. Looks like shit but functional and cant be bothered to improve aestethics. 
        this.createButton(game, "Play", game.world.centerX, game.world.centerY+192, 300, 100, function() {
            this.state.start('Level');
        });
        
        this.createButton(game, "About", game.world.centerX-192, game.world.centerY+192, 300, 100, function() {
            console.log('aboot');
        });
        
        
        titlescreen = game.add.sprite(game.world.centerX, game.world.centerY-192, 'titlescreen');
        titlescreen.anchor.setTo(0.5, 0.5);
        
    },
    
    update:function(game){
        
    },
    
    createButton:function(game, string,x,y,w,h,callback) {
        var button1 = game.add.button(x,y,'button', callback,this,2,1,0);
        
        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;
        
        var txt = game.add.text(button1.x, button1.y, string, {font:"14px Arial", fill:"#fff", align:"center"});
        txt.anchor.setTo(0.5, 0.5);
        
    }
    
}
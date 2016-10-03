Game.MainMenu = function(game) {

    this.game = game;
};

    var chosenMap;
     

Game.MainMenu.prototype = {
    create: function(game) {

        // this code block resizes the game back to original size 
        // when returning to main menu after playing a given level
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

        // Tell ScaleManager that we have changed sizes. 
        // this line gives en error, but seems to work without it. 
        // this.game.scale.setSize();
        
        var titlescreen = game.add.sprite(game.world.centerX, game.world.centerY, 'titlescreen');
        titlescreen.anchor.setTo(0.5);


        var numberOfMaps = maps.length;
        var mapCounter = 0;
        var levelButtons = [
            'level1',
            'level2',
            'level3',
            'level4',
            'level5',
            'level6',
            'level7',
            'level8',
            'level9'
            ]
        var unlocked = parseInt(localStorage.getItem('unlockedMaps'));
        
        if (isNaN(unlocked)) {
        localStorage.setItem('unlockedMaps', 0);
        unlocked = 0;
        }
        
        for (var map in maps) {
            // checks how many maps should be unlocked
            if (mapCounter <= unlocked) {
                
                this.createButton(game, map, levelButtons[map], 128 + ( windowWidth - 192 ) / numberOfMaps * map, game.world.centerY + windowHeight / 7);
                mapCounter++;
            }
            else {
                 this.add.sprite(128 + ( windowWidth - 192 ) / numberOfMaps * map, game.world.centerY +  windowHeight / 7, 'lock' );
            }
            
            
        }
    },

    update: function(game) {

    },

    createButton: function(game, index, image, x, y) {
        game.add.button(x, y, image, function() {
            chosenMap = maps[index];
            game.state.start('Level', true, false);
        });
    }

}
Game.MainMenu = function(game) {

    this.game = game;
};

var chosenMap;

Game.MainMenu.prototype = {
    create: function(game) {

        // this code block resizes the game back to original size 
        // when returning to main menu after playing a given level
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

        // Tell ScaleManager that we have changed sizes. 
        // this line gives en error, but seems to work without it. 
        // this.game.scale.setSize();
        
        var titlescreen = game.add.sprite(game.world.centerX, game.world.centerY, 'polarBear');
        titlescreen.anchor.setTo(0.5);


        var row = 0;
        var column = 0;
        var mapCounter = 0;
        var unlocked = parseInt(localStorage.getItem('unlockedMaps'));
        
        if (isNaN(unlocked)) {
        localStorage.setItem('unlockedMaps', 0);
        unlocked = 0;
        }
        
        for (var map in maps) {
            // checks how many maps should be unlocked
            if (mapCounter <= unlocked) {

                row = Math.floor(map / 5);
                column = map % 5;
                this.createButton(game, map, (300 - 64) + 150 * column, game.world.centerY + 150 * row);
                mapCounter++;
            }
        }
    },

    update: function(game) {

    },

    createButton: function(game, index, x, y) {
        game.add.button(x, y, 'playButton', function() {
            chosenMap = maps[index];
            // console.log("map chosen: " + maps[index]);
            // TODO: Put this chosenMap variable in the top Level Function (above prototype) in Level state and see if it can be found.
            // console.log(game.state.states['Level']).chosenMap = maps[map];
            game.state.start('Level', true, false);
        });
    }

}
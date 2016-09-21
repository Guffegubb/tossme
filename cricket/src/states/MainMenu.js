Game.MainMenu = function(game) {

    this.game = game;
};

var chosenMap;

Game.MainMenu.prototype = {
    create: function(game) {


        // this code block resizes the game back to original size 
        // when returning to main menu after playing a given level
        this.stage.backgroundColor = '#000000'; // black background set for now, may want to change this
        var width = 1200;
        var height = 600;
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


        var titlescreen = game.add.sprite(game.world.centerX, game.world.centerY - 192, 'titlescreen');
        titlescreen.anchor.setTo(0.5, 0.5);
        // TODO: Implement for several rows when too many maps are added, when menu buttons are added.
        for (var map in maps) {

            this.createButton(game, map, 200 + 200 * map, game.world.centerY + 150);
        }
    },

    update: function(game) {

    },

    createButton: function(game, index, x, y) {
        game.add.button(x, y, 'playButton', function() {
            chosenMap = maps[index];
            console.log("map chosen: " + maps[index]);
            // console.log(game.state.states['Level']).chosenMap = maps[map];
            game.state.start('Level', true, false);
        });
    }

}
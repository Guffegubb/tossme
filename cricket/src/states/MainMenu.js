Game.MainMenu = function(game) {

this.game = game;
};

var chosenMap; 

Game.MainMenu.prototype = {
    create: function(game) {

        var titlescreen = game.add.sprite(game.world.centerX, game.world.centerY - 192, 'titlescreen');
        titlescreen.anchor.setTo(0.5, 0.5);
        // TODO: Implement for several rows when too many maps are added
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
                game.state.start('Level');
            });
        }
        
}
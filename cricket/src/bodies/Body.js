function destroySprite(item) {
    item.kill();
};


function exitToMenu(game) {

    game.state.start('MainMenu');

}

function createExitButton(game) {
    var exit = game.add.sprite(1120, 10, 'exit');
    exit.fixedToCamera = true;
    exit.inputEnabled = true;
    exit.events.onInputDown.add(function() {
        exitToMenu(game)
    }, this);


}
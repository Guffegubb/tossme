function destroySprite(item) {
    item.destroy();
};


function exitToMenu(game) {

    game.state.start('MainMenu');

}

function createExitButton(game) {
    var exit = game.add.sprite(1120, 10, 'exit');
    exit.fixedToCamera = true;
    exit.inputEnabled = true;
    exit.events.onInputDown.add(function() {
        
        if (confirmExit()) {
            exitToMenu(game) 
            
        }
    }, this);


}
// TODO: Implement this to give user the chance to confirm before exiting
function confirmExit() {
    
    return true;
}


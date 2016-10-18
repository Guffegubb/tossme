
/**
 * Creates the exit button in the top right cornor
 */
function createExitButton(game) {
    var exit = game.add.sprite(windowWidth - 75, 10, 'exit');
    exit.fixedToCamera = true;
    exit.inputEnabled = true;
    exit.events.onInputDown.add(function() {

        if (confirmExit()) {
            exitToMenu(game)

        }
    }, this);


};

/**
 * Created if a 'confirm exit'-button is wanted in the future
 */
function confirmExit() {

    return true;
}

/**
 * Returns the player to the main menu
 */
function exitToMenu(game) {

    game.state.start('MainMenu');

};

/**
 * Calls the next map by incrementing the number of the current map
 */
function nextMap(game) {
    
    chosenMap++;
    
    if (chosenMap < maps.length) {
        game.state.start('Level', true, false);
    }
    else {
        game.state.start('Credits');
    }

};

/**
 * Fades out the game, shows a victory text and changes the map after fading out.
 * Also sets the variable changingMap to true which removes the possibility
 * of the player colliding with lethal tiles
 */
function mapComplete(game) {

    changingMap = true;

    updateUnlockedMaps();


    var nextLevelScreen = game.add.sprite(0, 0, 'nextLevelScreen');
    nextLevelScreen.fixedToCamera = true;

    var fadeScreen = game.add.sprite(0, 0, 'fadeScreen');
    fadeScreen.fixedToCamera = true;
    fadeScreen.alpha = 0;

    game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
        fadeScreen = game.add.tween(fadeScreen).to({
                alpha: 1
            },
            3000, Phaser.Easing.Circular.In, true, 0, 0, false);
        fadeScreen.onComplete.add(function() {
            nextLevelScreen.destroy();
            nextMap(game);
        }, this);

    });
};

/**
 * Fades out the game and restarts the state
 */
function restartMap(game) {
    var fadeScreen = game.add.sprite(0, 0, 'fadeScreen');
    fadeScreen.fixedToCamera = true;
    fadeScreen.alpha = 0;

    game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
        fadeScreen = game.add.tween(fadeScreen).to({
                alpha: 1
            },
            2000, Phaser.Easing.Exponential.In, true, 0, 0, false);
        fadeScreen.onComplete.add(function() {
            game.state.restart();
        }, this);

    });
};

/**
 * Updates localStorage on client browser to reflect map progress.
 */
function updateUnlockedMaps() {
    if (parseInt(localStorage.getItem('unlockedMaps')) <= chosenMap) {
        localStorage.setItem('unlockedMaps', parseInt(chosenMap) + 1);
    }
};

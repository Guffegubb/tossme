
function createExitButton(game) {
    var exit = game.add.sprite(1120, 10, 'exit');
    exit.fixedToCamera = true;
    exit.inputEnabled = true;
    exit.events.onInputDown.add(function() {

        if (confirmExit()) {
            exitToMenu(game)

        }
    }, this);


};


// TODO: Implement this to give user the chance to confirm before exiting
function confirmExit() {

    return true;
}


function exitToMenu(game) {

    game.state.start('MainMenu');

};


function nextMap(game) {
    
    //console.log("Look here");
    //console.log(maps.length);
    
    levelComplete.play();
    
    var counter = chosenMap.slice(-1);
    // NumberSize is used if we have more than 9 maps
    // That is the number takes up more than 1 space
    numberSize = counter.length;
    counter = parseInt(counter);
    counter = counter + 1;
    
    if (counter > maps.length) {
        game.state.start('Credits');
    }
    else {
        chosenMap = chosenMap.substring(0, chosenMap.length - numberSize) + counter;
        game.state.start('Level', true, false);    
    }
    
    
    
};

function mapComplete(game) {
    
    updateUnlockedMaps();
    
    var style = {
        font: "64px Arial",
        fill: "#413FAD",
        align: "center"
    }
    var t = game.add.text(game.width / 3, game.height / 3,
        "Level Complete!",
        style);
    t.fixedToCamera = true;
    
    game.time.events.add(Phaser.Timer.SECOND * 2, function() {
        nextMap(game);
    });
};

// Updates localStorage on client browser to reflect map progress.
// TODO: Removed || localStorage.getItem('unlockedMaps') == null from if-statement and moved it to MainMenu, if it bugs out put it back.
function updateUnlockedMaps() {
    if ( parseInt( localStorage.getItem('unlockedMaps') ) <= parseInt( chosenMap.slice(-1) ) ){
        localStorage.setItem('unlockedMaps', chosenMap.slice(-1));
    }
}
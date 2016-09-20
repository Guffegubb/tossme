

function destroySprite(item) {
    item.kill();
};


 var addAbilityText = function(game, mySprite, text) {
        var tempText;
        tempText = game.add.text(Math.floor(mySprite.x + mySprite.width / 2),
            Math.floor(mySprite.y + mySprite.height / 2), text);
        tempText.fixedToCamera = true;
        return tempText;

    }
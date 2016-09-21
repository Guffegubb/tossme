var blinkSign = -1;

var blink = function(player, item) {

    if (!(player.abilityOne == item.name || player.abilityTwo == item.name)) {
        abilityOneSprite.alpha = abilityOneSprite.alpha + blinkSign * 0.015;
        abilityTwoSprite.alpha = abilityTwoSprite.alpha + blinkSign * 0.015;
        item.alpha = item.alpha + blinkSign * 0.015;

        if (abilityOneSprite.alpha < 0.4) {
            blinkSign = 1;

        }
        if (abilityOneSprite.alpha >= 1) {
            blinkSign = -1;
        }
    }

}

var addAbilityText = function(game, mySprite, text) {
    var tempText;
    tempText = game.add.text(Math.floor(mySprite.x + mySprite.width / 2 + 10),
        Math.floor(mySprite.y + mySprite.height / 2), text);
    tempText.fixedToCamera = true;
    return tempText;

}

/**
 * Implemented this through the global variables cause it became such 
 * a clusterfuck otherwise
 */
var updateAbilityTexture = function(key, textureName) {
    if (key == 1)
        abilityOneSprite.loadTexture(textureName);
    else if (key == 2)
        abilityTwoSprite.loadTexture(textureName);
}
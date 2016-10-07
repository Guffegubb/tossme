var blinkSign = -1;
/**
 * Makes the abilitysprite shown in the left down corner of the game blink when 
 * player is standing on top of another ability
 */
function blink(player, item) {

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

};

/**
 * Adds a text over a sprite
 */
function addAbilityText(game, mySprite, text) {
    var tempText;
    tempText = game.add.text(Math.floor(mySprite.x + mySprite.width / 2 - 10),
        Math.floor(mySprite.y + mySprite.height), text);
    tempText.fixedToCamera = true;
    return tempText;

};

/**
 * Updates the texture the sprite shown in the left down corner
 */
function updateAbilityTexture(key, textureName) {
    if (key == 1)
        abilityOneSprite.loadTexture(textureName);
    else if (key == 2)
        abilityTwoSprite.loadTexture(textureName);
};


/**
 * Time checks how long the cooldown is and adjusts how long the ability is 
 *  displayed as blocked.
 * Bool checks if the player has picked up a second ability. Otherwise the
 *  blocked ability will only display on ability one.
 */
function displayAbilityCooldown(game, time, bool) {

  abilityFaderOne.alpha = 1;
  if (bool)
    abilityFaderTwo.alpha = 1;
  
  var tweenOne = game.add.tween(abilityFaderOne).to( {
                alpha: 0
            }, time, Phaser.Easing.Circular.In, true, 0, 0, false);
  
  var tweenTwo = game.add.tween(abilityFaderTwo).to( {
                alpha: 0
            }, time, Phaser.Easing.Circular.In, true, 0, 0, false);
    
};

/**
 * Resets the alpha value of the abilities shown in the left down corner
 * Used for example when moving away from another ability and it should stop
 * blinking
 */
function resetAbilityAlpha() {
    
    abilityOneSprite.alpha = 1;
    abilityTwoSprite.alpha = 1;
    abilityGroup.forEach(function(item) {
        item.alpha = 1;
    });
};

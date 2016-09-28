var blinkSign = -1;

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

function addAbilityText(game, mySprite, text) {
    var tempText;
    tempText = game.add.text(Math.floor(mySprite.x + mySprite.width / 2 + 10),
        Math.floor(mySprite.y + mySprite.height / 2), text);
    tempText.fixedToCamera = true;
    return tempText;

};

/**
 * Implemented this through the global variables cause it became such 
 * a clusterfuck otherwise
 */
function updateAbilityTexture(key, textureName) {
    if (key == 1)
        abilityOneSprite.loadTexture(textureName);
    else if (key == 2)
        abilityTwoSprite.loadTexture(textureName);
};


function displayAbilityCooldown(game, time) {

  abilityFaderOne.alpha = 1;
  abilityFaderTwo.alpha = 1;
  
  var tweenOne = game.add.tween(abilityFaderOne).to( {
                alpha: 0
            }, time, Phaser.Easing.Circular.In, true, 0, 0, false);
  
  var tweenTwo = game.add.tween(abilityFaderTwo).to( {
                alpha: 0
            }, time, Phaser.Easing.Circular.In, true, 0, 0, false);
    
};


function resetAbilityAlpha() {

    abilityTwoSprite.alpha = 1;
    abilityOneSprite.alpha = 1;
    // TODO: if we make groups not global, send in the specific ability 
    // from the group to the function to set the alpha = 1
    abilityGroup.forEach(function(item) {
        item.alpha = 1;
    });
};

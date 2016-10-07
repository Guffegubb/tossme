
/**
 * Initializes the shots shot by the player in a group of 6
 */
function declareProjectile(game) {
    var projectiles = game.add.group();
    projectiles.enableBody = true;
    projectiles.physicsBodyType = Phaser.Physics.ARCADE;
    projectiles.createMultiple(6, 'shotSpritesheet');
    projectiles.setAll('anchor.x', 0.5);
    projectiles.setAll('anchor.y', 0.5);

    projectiles.setAll('scale.x', 1);
    projectiles.setAll('scale.y', 1);

    projectiles.setAll('outOfBoundsKill', true);
    projectiles.setAll('checkWorldBounds', true);

    projectiles.forEach(function(item) {
        item.body.allowGravity = false;
        item.animations.add('shoot', [0, 1])
    });

    return projectiles;
}

/**
 * Creates a shot drawing it to game and giving it movement in the same
 * direction as the player sent in
 */
function shoot(game, player, projectiles) {
        game.time.events.add(Phaser.Timer.SECOND * 0.1, function() {
            projectile = projectiles.getFirstExists(false);
            if (projectile) {
                projectile.reset(player.x, player.y);
                projectile.body.velocity.x = player.direction() * 500;
                projectile.scale.setTo(player.direction(), 1);
                projectile.animations.play('shoot', 10, true);
            }
        });
}
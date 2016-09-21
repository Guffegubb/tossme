function declareProjectile(game, projectiles) {
    projectiles = game.add.group();
    projectiles.enableBody = true;
    projectiles.physicsBodyType = Phaser.Physics.ARCADE;
    projectiles.createMultiple(6, 'projectile');
    projectiles.setAll('anchor.x', 0.5);
    projectiles.setAll('anchor.y', 0.5);

    projectiles.setAll('scale.x', 1);
    projectiles.setAll('scale.y', 1);

    projectiles.setAll('outOfBoundsKill', true);
    projectiles.setAll('checkWorldBounds', true);

    projectiles.forEach(function(item) {
        item.body.allowGravity = false;
    });

    return projectiles;
}

function shoot(game, player, projectiles) {
    for (var i = 0; i <= 0; i++) {
        game.time.events.add(Phaser.Timer.SECOND * i * 0.1, function() {
            projectile = projectiles.getFirstExists(false);
            if (projectile) {
                projectile.reset(player.x, player.y);
                projectile.body.velocity.x = player.direction() * 500;


            }
        });
    }
}
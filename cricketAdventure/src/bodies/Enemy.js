function initEnemyGroup(game, enemies, properties) {
	
    enemies.setAll('anchor.x', 0.5);

    enemies.setAll('scale.x', 1);
    enemies.setAll('scale.y', 1);

    enemies.setAll('outOfBoundsKill', true);
    enemies.setAll('checkWorldBounds', true);

    enemies.forEach(function(enemy) {
        if (enemy.name == 'frog') {
            enemy.body.allowGravity = true;
            enemy.animations.add('walk', [0, 1]);
            enemy.animations.add('die', [2]);
        }
        else if (enemy.name == 'bee') {
            enemy.body.allowGravity = false;
            enemy.animations.add('walk', [3, 4]);
            enemy.animations.add('die', [5]);
        }
        
        
        enemy.speed = 200;
        enemy.walkingDistance = 1000;
        enemy.previous_x = enemy.x

        enemy.alive = true;

        enemy.animations.play('walk', 5, true);
    });

    return enemies;
};

function moveEnemy(enemy) {
    // Added so that it won't move if it's dead, this prevents it from changing
    // direction when have been killed
    if (isAlive(enemy)) {
        // Added so that it changes direction when blocked on the side
        // Also checking direction it is facing to avoid a bug of changing
        // direction before it has had time to move away from the blocked side
        if (enemy.body.blocked.left && getDirectionX(enemy) == -1) {
        	changeDirectionX(enemy);
        }
            
        else if (enemy.body.blocked.right && getDirectionX(enemy) == 1) {
        	changeDirectionX(enemy);
        }
            
        enemy.body.velocity.x = enemy.speed * getDirectionX(enemy);
        if (Math.abs(enemy.x - enemy.previous_x) >= enemy.walkingDistance) {
            changeDirectionX(enemy);
            enemy.previous_x = enemy.x;
        }
        
    }

};

function getDirectionX(enemy) {
    return -(enemy.scale.x / Math.abs(enemy.scale.x));
};

function changeDirectionX(enemy) {
    enemy.scale.setTo(enemy.scale.x * (-1), enemy.scale.y);
};

function changeDirectionY(enemy) {
    enemy.scale.setTo(enemy.scale.x, enemy.scale.y * (-1));
};
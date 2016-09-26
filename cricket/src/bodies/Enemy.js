function initEnemyGroup(game, enemies, properties) {
    //enemies.enableBody = true;
    //enemies.physicsBodyType = Phaser.Physics.ARCANDE;
    //enemies.add.sprite(500, 500, 'enemyTileset');

    //coins.create(game.world.randomX, game.world.randomY, 'coin', 0);
    enemies.setAll('anchor.x', 0.5);
    //enemies.setAll('anchor.y', 0.5);

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
        enemy.walkingDistance = 250;
        enemy.previous_x = enemy.x

        enemy.alive = true;

        //enemy.body.colldeWorldBounds = true;
        //enemy.body.allowGravity = true;
        //enemy.body.bounce.setTo(1, 0);
        //sprite3.body.bounce.setTo(1, 1);

        //enemy = game.add.sprite(64, 64, 'enemyTileset');

        

        enemy.animations.play('walk', 5, true);
    });

    return enemies;
};

/*function initEnemy(game, enemy, properties) {

    enemy.enableBody = true;
    enemy.physicsBodyType = Phaser.Physics.ARCADE;
    enemy.anchor.setTo(0.5);
    enemy.scale.setTo(-1, 1);

    enemy.speed = 200;
    enemy.walkingDistance = 100;


    return enemy;
};*/

function moveEnemy(enemy) {
    //enemy.animations.play('walk', 5, true);
    //console.log(getDirectionX(enemy));
    // Added so that it won't move if it's dead, this prevents it from changing
    // direction when have been killed
    if (isAlive(enemy)) {
        // Added so that it changes direction when blocked on the side
        if (enemy.body.blocked.left)
            changeDirectionX(enemy);
        else if (enemy.body.blocked.right)
            changeDirectionX(enemy);
            
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


function killEnemy(enemy) {
    // TODO: Fix so that the enemy is actually removed (At this point it doesn't
    // check outOfWorld bounds and there it is never killed :()
    enemy.enableBody = false;
    enemy.body.allowGravity = true;
    enemy.body.collideWorldBounds = false;
    enemy.body.checkCollision = false;
    enemy.alive = false;
    //enemy.anchor.setTo(enemy.anchor.x, 0.5);
    enemy.body.velocity.y = -200;
    changeDirectionY(enemy);
    // Add for death animation later
    //enemy.animations.play('die', 0, true);

};
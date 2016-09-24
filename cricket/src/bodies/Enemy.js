function initEnemyGroup(game, enemies, properties) {
    //enemies.enableBody = true;
    //enemies.physicsBodyType = Phaser.Physics.ARCANDE;
    //enemies.add.sprite(500, 500, 'enemyTileset');

    //coins.create(game.world.randomX, game.world.randomY, 'coin', 0);
    enemies.setAll('anchor.x', 0.5);
    //enemies.setAll('anchor.y', 0.5);

    enemies.setAll('scale.x', 1);
    enemies.setAll('scale.y', 1);

    enemies.forEach(function(item) {
        item.speed = 200;
        item.walkingDistance = 250;
        item.previous_x = item.x
        
        //item.body.colldeWorldBounds = true;
        item.body.allowGravity = true;
        
        //item = game.add.sprite(64, 64, 'enemyTileset');

        item.animations.add('walk', [0, 1]);
        item.animations.add('die', [2]);
        item.animations.play('walk', 5, true);
    });

    return enemies;
};

function initEnemy(game, enemy, properties) {

    enemy.enableBody = true;
    enemy.physicsBodyType = Phaser.Physics.ARCADE;
    enemy.anchor.setTo(0.5);
    enemy.scale.setTo(-1, 1);

    enemy.speed = 200;
    enemy.walkingDistance = 100;


    return enemy;
};

function moveEnemy(enemy) {
    //enemy.animations.play('walk', 5, true);
    enemy.body.velocity.x = enemy.speed * getDirectionX(enemy);
    if (Math.abs(enemy.x - enemy.previous_x) >= enemy.walkingDistance) {
        enemy.scale.x = enemy.scale.x * (-1);
        enemy.previous_x = enemy.x;
    }
};

function getDirectionX(enemy) {
    return -(enemy.scale.x / Math.abs(enemy.scale.x));
};

function changeDirectionX(enemy) {
    enemy.setScale(enemy.scale.x * (-1), enemy.scale.y);
};

function changeDirectionY(enemy) {
    enemy.setScale(enemy.scale.x, enemy.scale.y * (-1));
};

function killEnemy(enemy) {
    console.log("killed an enemy");
    //enemy.anchor.setTo(enemy.anchor.x, 0.5);
    enemy.body.velocity.y = -200;
    enemy.scale.setTo(enemy.scale.x, -1);
    enemy.animations.play('die', 0, true);
}
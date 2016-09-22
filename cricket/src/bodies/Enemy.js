

var initEnemyGroup = function(game, enemies, properties) {
    //enemies.enableBody = true;
    //enemies.physicsBodyType = Phaser.Physics.ARCANDE;
    enemies.setAll('anchor.x', 0.5);
    //enemies.setAll('anchor.y', 0.5);
    
    enemies.setAll('scale.x', 1);
    enemies.setAll('scale.y', 1);
    
    enemies.forEach(function(item) {
       item.speed = 200;
       item.walkingDistance = 250;
       item.previous_x = item.x
    });
    
    return enemies;
};

var initEnemy = function(game, enemy, properties) {
    
    //enemy = game.add.sprite(400, 400, 'frog');
    enemy.enableBody = true;
    enemy.physicsBodyType = Phaser.Physics.ARCADE;
    enemy.anchor.setTo(0.5);
    enemy.scale.setTo(-1, 1);
    
    enemy.speed = 200;
    enemy.walkingDistance = 100;
    
    
    return enemy;
};

var moveEnemy = function(enemy) {
    enemy.body.velocity.x = enemy.speed * getDirectionX(enemy);
    if (Math.abs(enemy.x - enemy.previous_x) >= enemy.walkingDistance) {
        enemy.scale.x = enemy.scale.x * (-1);
        enemy.previous_x = enemy.x;
    }
};

var getDirectionX = function(enemy) {
    return -(enemy.scale.x / Math.abs(enemy.scale.x));
};

var changeDirectionX = function(enemy) {
    enemy.setScale(enemy.scale.x * (-1), enemy.scale.y);
};

var changeDirectionY = function(enemy) {
    enemy.setScale(enemy.scale.x, enemy.scale.y * (-1));
};
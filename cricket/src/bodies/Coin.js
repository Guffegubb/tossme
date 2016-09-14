
Coin = function(game, properties) {
    
    
    this.coin  = game.add.sprite(properties.x, properties.y - properties.height, 'bird');
    this.coin.anchor.setTo(0.5, 0.5);
    game.physics.enable(this.coin, Phaser.Physics.ARCADE);
    this.coin.body.allowGravity = false;
    
    this.coin.destroySprite = function() {
        this.kill();
    }
    
    return this.coin;
}
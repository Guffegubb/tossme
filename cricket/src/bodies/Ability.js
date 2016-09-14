
Ability = function(game, properties) {
    
    
    // TODO: Change the picture of bird
    this.ability = game.add.sprite(properties.x, properties.y - properties.height, 'bird');
    this.ability.anchor.setTo(0.5, 0.5);
    game.physics.enable(this.ability, Phaser.Physics.ARCADE);
    this.ability.body.allowGravity = false;
    
    this.ability.destroySprite = function() {
        this.kill();
    }
    
    
    return this.ability;
}
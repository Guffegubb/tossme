EnemyBird = function(index, game, x, y) {
  
  // "this variable will now be global to our classes"
  this.bird = game.add.sprite(x,y,'bird');
  this.bird.anchor.setTo(0.5,0.5);
  this.bird.scale.setTo(2,2);
  //give every enemy bird a name (which will be its index)
  this.bird.name = index.toString();
  game.physics.enable(this.bird, Phaser.Physics.ARCADE);
  this.bird.body.immovable = true;
  this.bird.body.collideWorldBounds = true;
  this.bird.body.allowGravity = false;
  
  this.birdTween = game.add.tween(this.bird).to({
    y: this.bird.y + 100
  }, 2000, 'Linear', true,0,100,true);
  

  
}
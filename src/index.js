import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
      // gravity: { y: 50 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

new Phaser.Game(config);
let bird = null;
let pipeDown = null;
let pipeUp = null;
let distance = 200;
const VELOCITY = 200;
const initialBirdPosition = {
  x: 100,
  y: 45 
}


function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('dude5', 'assets/dude.png'); 
  this.load.image('pipe', 'assets/pipe.png'); 
}

function create () {
  this.add.image(400, 300, 'sky');
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'dude').setOrigin(0, 0);
  this.input.keyboard.on('keydown_SPACE', flap);
  bird.setGravityY(50);

  pipeUp = this.physics.add.sprite(500, 200, 'pipe').setOrigin(0, 1);
  pipeDown = this.physics.add.sprite(500, 400, 'pipe').setOrigin(0, 0);

}

function update (time, delta) {
  if (bird.y > (600 - bird.body.height) || bird.y < 0) {
    resetGame();
  }
}

function resetGame() {
  bird.y = initialBirdPosition.y; 
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = -100;
}
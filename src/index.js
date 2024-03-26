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
let pipes = null;

const PIPE_PAIRS = 5; // Number of pipe pairs
const PIPE_START_X = 500; // X position of the first pipe
const VELOCITY = -150;
const initialBirdPosition = {
  x: 100,
  y: 45 
}

function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('dude88', 'assets/dude.png');
  this.load.image('pipe', 'assets/pipe.png'); 
}

function create () {
  this.add.image(400, 300, 'sky');
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'dude').setOrigin(0, 0);
  this.input.keyboard.on('keydown_SPACE', flap);
  bird.setGravityY(50);

  // Create a group for all pipes
  pipes = this.physics.add.group();

  // ZASTANOWIĆ SIĘ JAK ZLIKWIDOWAĆ BUGA ZWIĄZANEGO Z- linia 51: let positionX = PIPE_START_X + i * getRandomXDistance();
  // Powinniśmy w jakiś sposób kumuluwać wartość positionX

  // Pomysł A:
  // krok 1: zdefiniować positionX poza pętlą
  // krok 2: zwiększać ją o jakąś wartość przy kazdej iteracji

  for (let i = 0; i < PIPE_PAIRS; i++) {
    let positionX = PIPE_START_X + i * getRandomXDistance();
    let bottomOfPipeUp = getRandomBottomOfPipeUp();
    let pipeUp = pipes.create(positionX, bottomOfPipeUp, 'pipe').setOrigin(0, 1);
    let pipeDown = pipes.create(positionX, bottomOfPipeUp + getRandomYDistance(), 'pipe').setOrigin(0, 0);
    pipeUp.body.velocity.x = VELOCITY;
    pipeDown.body.velocity.x = VELOCITY;
  }
}

function update (time, delta) {
  if (bird.y > (600 - bird.body.height) || bird.y < 0) {
    resetGame();
  }

  recyclePipes(); 
}

function resetGame() {
  bird.y = initialBirdPosition.y; 
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = -100;
}

function recyclePipes() {
  let toRight = getRightMostPipe() + getRandomXDistance();
  let bottomOfPipeUp = getRandomBottomOfPipeUp();

  pipes.getChildren().forEach(pipe => {
    if (pipe.x < 0 ) {
      pipe.x = toRight
      pipe.y = bottomOfPipeUp;
      bottomOfPipeUp = bottomOfPipeUp + getRandomYDistance()
    }
  })
}

function getRightMostPipe() {
  let rightMostX = 0

  pipes.getChildren().forEach(pipe => {
    rightMostX = Math.max(pipe.x, rightMostX)
  })
  return rightMostX
}

function getRandomXDistance() {
  return Phaser.Math.Between(100, 101);
}

function getRandomBottomOfPipeUp() {
  return Phaser.Math.Between(10, 300); 
}

function getRandomYDistance() {
  return Phaser.Math.Between(200, 290);
}
import Phaser from "phaser";

const PIPE_PAIRS = 5;
const VELOCITY = -150;

class PlayScene extends Phaser.Scene {

    constructor() {
        super('PlayScene');
        this.initialBirdPosition = {
            x: 100,
            y: 300 
          }
        this.bird = null;
        this.pipes = null;
        this.score = 0;
        this.scoreText = '';
        
    }
    preload() {
      this.load.image('sky', '../assets/sky.png');
      this.load.image('bird', '../assets/bird.png');
      this.load.image('pipe', '../assets/pipe.png'); 
    }
    create() {
      this.createBG();
      this.createBird();
      this.createPipes();
      this.createColiders();
      this.createScore();
      this.handleInputs();
    }

    update(time, delta) {
      this.updateGameStatus();
      this.recyclePipes(); 
    }

    createBG() {
      this.add.image(400, 300, 'sky');
    }

    createBird() {
      this.bird = this.physics.add.sprite(this.initialBirdPosition.x, this.initialBirdPosition.y, 'bird').setOrigin(0, 0);
      this.bird.setGravityY(50);
      this.bird.setCollideWorldBounds(true);
    }

    createPipes() {
      this.pipes = this.physics.add.group();

      for (let i = 0; i < PIPE_PAIRS; i++) {
        let positionX = this.getRightMostPipe() + this.getRandomXDistance();
        if (i==0) {
          positionX += 200;
        }
        let bottomOfPipeUp = this.getRandomBottomOfPipeUp();
        let pipeUp = this.pipes.create(positionX, bottomOfPipeUp, 'pipe').setOrigin(0, 1).setImmovable(true);
        let pipeDown = this.pipes.create(positionX, bottomOfPipeUp + this.getRandomYDistance(), 'pipe').setOrigin(0, 0).setImmovable(true);
        pipeUp.body.velocity.x = VELOCITY;
        pipeDown.body.velocity.x = VELOCITY;
      }
    }

    createColiders() {
      this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }

    createScore() {
      this.score = 0;
      this.scoreText = this.add.text(16, 16, `score: ${0}`, { fontSizes: '32px', fill: '#000'});
    }

    handleInputs() {
      this.input.keyboard.on('keydown_SPACE', this.flap, this);
      this.input.on('pointerdown', this.flap, this);
    }

    updateGameStatus() {
      if (this.bird.getBounds().bottom >= 600  || this.bird.y <= 0) {
        this.gameOver();
      }
    }

    flap() {
        this.bird.body.velocity.y = -100;
    }
    getRightMostPipe() {
      let rightMostX = 0
    
      this.pipes.getChildren().forEach(pipe => {
        rightMostX = Math.max(pipe.x, rightMostX)
      })
      return rightMostX
    }
    getRandomXDistance() {
      return Phaser.Math.Between(400, 600);
    }
    getRandomBottomOfPipeUp() {
      return Phaser.Math.Between(10, 300); 
    }
    getRandomYDistance() {
      return Phaser.Math.Between(200, 290);
    }

    // resetGame() {
    //   this.bird.y = this.initialBirdPosition.y; 
    //   this.bird.body.velocity.y = 0;
    // }

    gameOver() {
      this.bird.setTint(0xEE4824);
      this.physics.pause();
      this.time.addEvent( {
        delay: 1000,
        callback: () => {
          this.scene.restart();
        },
        loop: false
      })
    }

    recyclePipes() {
      let toRight = this.getRightMostPipe() + this.getRandomXDistance();
      let bottomOfPipeUp = this.getRandomBottomOfPipeUp();
    
      this.pipes.getChildren().forEach(pipe => {
        if (pipe.x < 0 ) {
          pipe.x = toRight
          pipe.y = bottomOfPipeUp;
          bottomOfPipeUp = bottomOfPipeUp + this.getRandomYDistance()
        }
      })
    }
}

export default PlayScene;
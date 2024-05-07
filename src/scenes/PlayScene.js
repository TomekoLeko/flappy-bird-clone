import Phaser from "phaser";

const PIPE_PAIRS = 5;
const VELOCITY = -150;

class PlayScene extends Phaser.Scene {

    constructor() {
        super('PlayScene');
        this.initialBirdPosition = {
            x: 100,
            y: 45 
          }
        this.bird = null;
        this.pipes = null;
        
    }
    preload() {
      this.load.image('sky', '../assets/sky.png');
      this.load.image('dude88', '../assets/dude.png');
      this.load.image('pipe', '../assets/pipe.png'); 
    }
    create() {
      this.add.image(400, 300, 'sky');
      this.bird = this.physics.add.sprite(this.initialBirdPosition.x, this.initialBirdPosition.y, 'dude').setOrigin(0, 0);
      this.input.keyboard.on('keydown_SPACE', this.flap);
      this.bird.setGravityY(50);
    
    this.pipes = this.physics.add.group();

      for (let i = 0; i < PIPE_PAIRS; i++) {
        let positionX =  this.getRightMostPipe() + this.getRandomXDistance();
        let bottomOfPipeUp = this.getRandomBottomOfPipeUp();
        let pipeUp = this.pipes.create(positionX, bottomOfPipeUp, 'pipe').setOrigin(0, 1);
        let pipeDown = this.pipes.create(positionX, bottomOfPipeUp + this.getRandomYDistance(), 'pipe').setOrigin(0, 0);
        pipeUp.body.velocity.x = VELOCITY;
        pipeDown.body.velocity.x = VELOCITY;
      }
    }
    update(time, delta) {
      if (this.bird.y > (600 - this.bird.body.height) || this.bird.y < 0) {
        this.resetGame();
      }
    
      this.recyclePipes(); 
    }

    flap() {
        console.log("Flap flap flap: " + this.bird)
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
      return Phaser.Math.Between(200, 400);
    }
    getRandomBottomOfPipeUp() {
      return Phaser.Math.Between(10, 300); 
    }
    getRandomYDistance() {
      return Phaser.Math.Between(200, 290);
    }

    resetGame() {
      console.log("Game over")
      // bird.y = initialBirdPosition.y; 
      // bird.body.velocity.y = 0;
    }

    recyclePipes() {
      console.log("recycle pipes")
      // let toRight = getRightMostPipe() + getRandomXDistance();
      // let bottomOfPipeUp = getRandomBottomOfPipeUp();
    
      // pipes.getChildren().forEach(pipe => {
      //   if (pipe.x < 0 ) {
      //     pipe.x = toRight
      //     pipe.y = bottomOfPipeUp;
      //     bottomOfPipeUp = bottomOfPipeUp + getRandomYDistance()
      //   }
      // })
    }
}

export default PlayScene;
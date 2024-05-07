import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";

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
  scene: [PlayScene]
};

new Phaser.Game(config);
let pipes = null;

const PIPE_PAIRS = 5; // Number of pipe pairs
const VELOCITY = -150;

function preload () {

}

function create () {
}

function update (time, delta) {

}

function flap() {
  bird.body.velocity.y = -100;
}



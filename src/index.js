import Phaser from "phaser";
import MenuScene from "./scenes/MenuScene";
import PlayScene from "./scenes/PlayScene";
import PreloadScene from "./scenes/PreloadScene";

const WIDTH = 800
const HEIGTH = 600
const BIRD_POSITION = {x: 100, y: 300}

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGTH,
  startPosition: BIRD_POSITION
}

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
      // gravity: { y: 50 }
    }
  },
  scene: [new PreloadScene(SHARED_CONFIG), new MenuScene(SHARED_CONFIG), new PlayScene(SHARED_CONFIG)]
};

new Phaser.Game(config);
// let pipes = null;

// const PIPE_PAIRS = 5; 
// const VELOCITY = -150;

function preload () {

}

function create () {
}

function update (time, delta) {

}

function flap() {
  bird.body.velocity.y = -100;
}



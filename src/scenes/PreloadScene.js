import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {

    constructor(config) {
      super('PreloadScene');

    }
    preload() {
      this.load.image('sky', '../assets/sky.png');
      this.load.image('bird', '../assets/bird.png');
      this.load.image('pipe', '../assets/pipe.png'); 
      this.load.image('pause', '../assets/pause.png');
      this.load.image('start', '../assets/pause.png');
    }
    create() {
      this.scene.start("MenuScene")
    }
}

export default PreloadScene;
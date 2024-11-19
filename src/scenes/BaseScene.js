import Phaser from "phaser";

class BaseScene extends Phaser.Scene {

    constructor(key, config) {
      super(key);
      this.config = config;   
    }
    create() {
        this.add.image(400, 300, 'sky');
    }
}

export default BaseScene;
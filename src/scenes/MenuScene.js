import Phaser from "phaser";

class MenuScene extends Phaser.Scene {

    constructor(config) {
      super('MenuScene');

      this.config = config;   
    }
    create() {
      this.createBG();
      this.createStart();
    }

    update(time, delta) {

    }

    createBG() {
      this.add.image(400, 300, 'sky');
    }

    createStart() {
      let startButton = this.add.image(this.config.width - 400, this.config.height - 300, 'start')
      .setScale(2)
      .setOrigin(1)
      .setInteractive()

      startButton.setInteractive();

      startButton.on('pointerdown', () => {
        this.scene.start("PlayScene")
      });
    }
      
}

export default MenuScene;
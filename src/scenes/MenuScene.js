import BaseScene from './BaseScene';

class MenuScene extends BaseScene {

    constructor(config) {
      super('MenuScene', config);

      this.config = config;   
    }
    create() {
      super.create()
      this.createBG();
      this.createStart();
      this.add.text(this.config.width - 435, this.config.height - 350, 'Menu:', { fontSizes: '32px', fill: '#000'});
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
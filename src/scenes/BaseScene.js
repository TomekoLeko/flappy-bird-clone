import Phaser from "phaser";

class BaseScene extends Phaser.Scene {

    constructor(key, config) {
      super(key);
      this.config = config;   
      this.screenCenter = [config.width / 2, config.height / 2];
      this.fontSize = 32;
      this.lineHeight = 42;
      this.fontOptions = {fontSize:`${this.fontSize}px`, fill:'#fff'}
    }
    create() {
        this.add.image(400, 300, 'sky');
    }
 
    createMenu(menu) {
      let lastMenuPositionY = 0;

      this.menu.forEach(menuItem => {
        const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY]
        this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5, 1);
        lastMenuPositionY += this.lineHeight;
      })
    }
  }

export default BaseScene;
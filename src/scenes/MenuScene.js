import BaseScene from './BaseScene';

class MenuScene extends BaseScene {

    constructor(config) {
      super('MenuScene', config);
      this.menu = [
        {scene: 'PlayScene', text: 'Play'},
        {scene: 'ScoreScene', text: 'Score'},
        {scene: null, text: 'Exit'}
      ]

      this.config = config;   
    }
    create() {
      super.create()
      this.createMenu(this.menu);
    }

    update(time, delta) {

    }

      
}

export default MenuScene;
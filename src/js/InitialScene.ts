import { Scene } from "phaser";
import { game } from ".";


export class InitialScene extends Scene {
  constructor() {
    super("InitialScene");
  }


  preload() {
  }

  create() {

    this.addBackground("layerSky7", 'layer07_Sky');
    this.addBackground("layerRocks6", 'layer06_Rocks');
    this.addBackground("layerHills5", 'layer05_Hills');
    this.addBackground("layerClouds4", 'layer04_Clouds');
    this.addBackground("layerHillsCastle3", 'layer03_Hills_Castle');
    this.addBackground("layerTreeRocks2", 'layer02_Trees_rocks');
    this.addBackground("layerGround1", 'layer01_Ground');

    this.input.once('pointerdown', () => {


      this.scene.start('PlayGame');

    });
  }




  addBackground(obj, name) {

    this[obj] = this.add.tileSprite(0, 0, game.config.width, game.config.height, name);
    this[obj].setOrigin(0, 0);
    this[obj].setScrollFactor(0);
    this[obj].setTileScale(0.6, 0.6);

  }
}



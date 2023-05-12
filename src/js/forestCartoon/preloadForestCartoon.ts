import { Scene } from "phaser";

export class preloadGameForestCartoon extends Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    // load all assets tile sprites
    this.load.image("bg_1", "assets/bg-1.png");
    this.load.image("bg_2", "assets/bg-2.png");
    this.load.image("ground", "assets/ground.png");

    // load all background 
    this.load.image("layer01_Ground", "assets/forestCartoon/layer01_Ground.png");
    this.load.image("layer02_Trees", "assets/forestCartoon/layer02_Trees.png");
    this.load.image("layer03_Hills_1", "assets/forestCartoon/layer03_Hills_1.png");
    this.load.image("layer04_Hills_2", "assets/forestCartoon/layer04_Hills_2.png");
    this.load.image("layer05_Clouds", "assets/forestCartoon/layer05_Clouds.png");
    this.load.image("layer06_Rocks", "assets/forestCartoon/layer06_Rocks.png");
    this.load.image("layer07_Sky", "assets/forestCartoon/layer07_Sky.png");




    // load spritesheet
    this.load.spritesheet("player", "assets/bee.png", {
      frameWidth: 37,
      frameHeight: 39,
    });
  }
  create() {
    this.scene.start("PlayGame");
  }
}
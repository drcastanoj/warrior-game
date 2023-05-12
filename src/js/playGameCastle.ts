import { Scene } from "phaser";
import { game } from "./index";

export class playGameCastle extends Scene {
  bg_1;
  bg_2;
  ground;
  player;
  cursors;
  myCam;

  layerGround1;
  layerTreeRocks2;
  layerHillsCastle3;
  layerClouds4;
  layerHills5;
  layerRocks6;
  layerSky7;


  constructor() {
    super("PlayGame");
  }
  create() {

    this.addBackground("layerSky7", 'layer07_Sky');
    this.addBackground("layerRocks6", 'layer06_Rocks');
    this.addBackground("layerHills5", 'layer05_Hills');
    this.addBackground("layerClouds4", 'layer04_Clouds');
    this.addBackground("layerHillsCastle3", 'layer03_Hills_Castle');
    this.addBackground("layerTreeRocks2", 'layer02_Trees_rocks');
    this.addBackground("layerGround1", 'layer01_Ground');

    // add player
    this.player = this.add.sprite(50, game.config.height / 2, "player");
    // create an animation for the player
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });
    this.player.play("fly");

    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();


    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, game.config.width * 100, game.config.height);

    // making the camera follow the player
    this.myCam.startFollow(this.player,);

  }

  addBackground(obj, name) {

    this[obj] = this.add.tileSprite(0, 0, game.config.width, game.config.height, name);
    this[obj].setOrigin(0, 0);
    this[obj].setScrollFactor(0);
    this[obj].setTileScale(0.23, 0.23);

  }


  update() {
    const velocity = 4;

    // move the player when the arrow keys are pressed
    if (this.cursors.up.isDown && this.player.y > 0) {
      this.player.y -= velocity;
      this.player.scaleY = 1;
      this.player.x += velocity;
      this.player.scaleX = -1;
    }
    else if (this.cursors.down.isDown && this.player.y < game.config.height - 42) {
      this.player.y += velocity;
      this.player.scaleY = 1;
      this.player.x += velocity;
      this.player.scaleX = -1;
    } else if (this.player.x < game.config.width * 100) {
      this.player.x += velocity;
      this.player.scaleX = -1;
    }


    this.layerGround1.tilePositionX = this.myCam.scrollX * .3;
    this.layerTreeRocks2.tilePositionX = this.myCam.scrollX * .6;
    this.layerHillsCastle3.tilePositionX = this.myCam.scrollX * .4;
    this.layerClouds4.tilePositionX = this.myCam.scrollX * .6;
    this.layerHills5.tilePositionX = this.myCam.scrollX * .6;
    this.layerRocks6.tilePositionX = this.myCam.scrollX * .3;
    this.layerSky7.tilePositionX = this.myCam.scrollX * .3;

  }
}

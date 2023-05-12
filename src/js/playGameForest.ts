import { GameObjects, Physics, Scene, Tilemaps, Types } from "phaser";
import { game } from "./index";
import HelmetWarrior from "../Players/HelmetWarrior";
import BrownWarrior from "../Players/BrownWarrior";

export class playGameForest extends Scene {
  bg_1;
  bg_2;
  ground: Types.Physics.Arcade.ImageWithStaticBody;
  player: Physics.Arcade.Sprite;
  cursors: Types.Input.Keyboard.CursorKeys;
  myCam;
  groundTile: GameObjects.TileSprite;

  player2: Physics.Arcade.Sprite;

  ground2: Types.Physics.Arcade.ImageWithStaticBody;


  _collisionGroup: Physics.Arcade.Group;

  groupGround: Physics.Arcade.StaticGroup;

  warrior;

  warriorHelmet;

  layerGround_1;
  layerTreesAndBushes_2;
  layerDistantTrees_3;
  layerBushes_4;
  layerHills1_5;
  layerHills2_6;
  layerHugeClouds_7;
  layerClouds_8;
  layerDistantClouds_9;
  layerDistantClouds_10;
  layerBackground_11;

  coinGroup;

  scoreText: GameObjects.Text;

  counterCoins = 0;

  platformGroup;




  constructor() {
    super("PlayGame");
  }
  create() {

    // create an tiled sprite with the size of our game screen
    // this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_1");
    // // Set its pivot to the top left corner
    // this.bg_1.setOrigin(0, 0);
    // // fixe it so it won't move when the camera moves.
    // // Instead we are moving its texture on the update
    // this.bg_1.setScrollFactor(0);

    // // Add a second background layer. Repeat as in bg_1
    // this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_2");
    // this.bg_2.setOrigin(0, 0);
    // this.bg_2.setScrollFactor(0);


    this.addBackground("layerBackground_11", '11_background');
    this.addBackground("layerDistantClouds_10", '10_distant_clouds');
    this.addBackground("layerDistantClouds_9", '09_distant_clouds1');
    this.addBackground("layerClouds_8", '08_clouds');
    this.addBackground("layerHugeClouds_7", '07_huge_clouds');
    this.addBackground("layerHills2_6", '06_hill2');
    this.addBackground("layerHills1_5", '05_hill1');
    this.addBackground("layerBushes_4", '04_bushes');
    this.addBackground("layerDistantTrees_3", '03_distant_trees');
    this.addBackground("layerTreesAndBushes_2", '02_trees and bushes');

    this.player = new BrownWarrior(this, 0, 0);

    this.bg_2 = this.add.tileSprite(0, 0, 180, 70, "LeanTech_Color");
    this.bg_2.setOrigin(0, 0);
    this.bg_2.setTileScale(0.4, 0.4);
    this.bg_2.setScrollFactor(0);

    //this.player = new HelmetWarrior(this, 0, 0);

    this.groupGround = this.physics.add.staticGroup();

    for (let index = 0; index < 6; index++) {
      const ground = this.physics.add.staticImage(150 * index, 500, "01_ground").setScale(0.25).refreshBody();
      this.groupGround.add(ground);

    }

    for (let index = 9; index < 130; index = index + 4) {
      const isTop = Math.random() * 10;

      if (isTop < 7) {
        const ground = this.physics.add.staticImage(120 * index, 500, "01_ground").setScale(0.25).refreshBody();
        this.groupGround.add(ground);

      }

    }



    this.anims.create({
      key: "coinMove",
      frames: this.anims.generateFrameNumbers("coin"),
      frameRate: 20,
      repeat: -1
    });
    this.coinGroup = this.physics.add.staticGroup();
    this.platformGroup = this.physics.add.staticGroup();



    for (let index = 1; index < 130; index = index + 4) {
      const isTop = Math.random() * 10;
      const xBlock = 100 * index
      const staticBlock = this.add.tileSprite(xBlock, 300, 210, 30, 'crate');
      this.physics.add.existing(staticBlock, true);

      this.platformGroup.add(staticBlock);
      if (isTop > 5) {


        const coin1 = this.physics.add.staticSprite(xBlock - 40, 260, "coin").setScale(0.4).refreshBody();
        coin1.play('coinMove');
        const coin2 = this.physics.add.staticSprite(xBlock, 260, "coin").setScale(0.4).refreshBody();
        coin2.play('coinMove');
        const coin3 = this.physics.add.staticSprite(xBlock + 40, 260, "coin").setScale(0.4).refreshBody();
        coin3.play('coinMove');
        this.coinGroup.add(coin1);
        this.coinGroup.add(coin2);
        this.coinGroup.add(coin3);

      } else {

        const xBlock = 100 * index

        const coin1 = this.physics.add.staticSprite(xBlock - 50, 410, "coin").setScale(0.4).refreshBody();
        coin1.play('coinMove');
        const coin2 = this.physics.add.staticSprite(xBlock, 7 + 410, "coin").setScale(0.4).refreshBody();
        coin2.play('coinMove');

        this.coinGroup.add(coin1);
        this.coinGroup.add(coin2);



      }



    }


    this.cursors = this.input.keyboard.createCursorKeys();


    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, game.config.width * 100, game.config.height);

    // making the camera follow the player
    this.myCam.startFollow(this.player);

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player, this.platformGroup, null,
      (player: any, platform) => {
        return player.body.velocity.y >= 0;
      });

    this.physics.add.collider(this.player, this.groupGround);
    this.physics.add.overlap(this.player, this.coinGroup, this.collectCoin, null, this);




    //this.physics.add.collider(this.player, staticBlock);

    this.scoreText = this.add.text(650, 50, 'Score: 0', { color: '#000', fontSize: 26 });
    this.scoreText.setOrigin(0.5, 0.5);
    this.scoreText.scrollFactorX = 0;

    this.counterCoins = 0;

  }

  collectCoin(player, coin) {

    coin.disableBody(true, true);
    this.counterCoins++;
    this.scoreText.setText("Score: " + this.counterCoins);
  }

  public get collisionGroup() {
    return this._collisionGroup;
  }

  public set collisionGroup(group) {
    this._collisionGroup = group;
  }

  addBackground(obj, name) {

    this[obj] = this.add.tileSprite(0, 0, game.config.width, game.config.height, name);
    this[obj].setOrigin(0, 0);
    this[obj].setScrollFactor(0);
    this[obj].setTileScale(0.37, 0.37);

  }


  update() {





    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.layerTreesAndBushes_2.tilePositionX = this.myCam.scrollX * .3;
    this.layerDistantTrees_3.tilePositionX = this.myCam.scrollX * .6;
    this.layerBushes_4.tilePositionX = this.myCam.scrollX * .4;
    this.layerHills1_5.tilePositionX = this.myCam.scrollX * .6;
    this.layerHills2_6.tilePositionX = this.myCam.scrollX * .6;
    this.layerHugeClouds_7.tilePositionX = this.myCam.scrollX * .3;
    this.layerClouds_8.tilePositionX = this.myCam.scrollX * .3;
    this.layerClouds_8.tilePositionX = this.myCam.scrollX * .3;
    this.layerDistantClouds_9.tilePositionX = this.myCam.scrollX * .3;
    this.layerDistantClouds_10.tilePositionX = this.myCam.scrollX * .3;
    this.layerBackground_11.tilePositionX = this.myCam.scrollX * .3;


  }
}

import { Scene } from "phaser";

export class preloadGame extends Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    // load all assets tile sprites
    this.load.image("bg_1", "assets/bg-1.png");
    this.load.image("bg_2", "assets/bg-2.png");
    this.load.image("ground", "assets/ground.png");

    // load all background 
    this.load.image("01_ground", "assets/bg-1/01_ground.png");
    this.load.image("02_trees and bushes", "assets/bg-1/02_trees and bushes.png");
    this.load.image("03_distant_trees", "assets/bg-1/03_distant_trees.png");
    this.load.image("04_bushes", "assets/bg-1/04_bushes.png");
    this.load.image("05_hill1", "assets/bg-1/05_hill1.png");
    this.load.image("06_hill2", "assets/bg-1/06_hill2.png");
    this.load.image("07_huge_clouds", "assets/bg-1/07_huge_clouds.png");
    this.load.image("08_clouds", "assets/bg-1/08_clouds.png");
    this.load.image("09_distant_clouds1", "assets/bg-1/09_distant_clouds1.png");
    this.load.image("10_distant_clouds", "assets/bg-1/10_distant_clouds.png");
    this.load.image("11_background", "assets/bg-1/11_background.png");


    this.load.image('crate', 'assets/crate32.png');



    /// load castle background
    this.load.image("layer01_Ground", "assets/castle/layer01_Ground.png");
    this.load.image("layer02_Trees_rocks", "assets/castle/layer02_Trees_rocks.png");
    this.load.image("layer03_Hills_Castle", "assets/castle/layer03_Hills_Castle.png");
    this.load.image("layer04_Clouds", "assets/castle/layer04_Clouds.png");
    this.load.image("layer05_Hills", "assets/castle/layer05_Hills.png");
    this.load.image("layer06_Rocks", "assets/castle/layer06_Rocks.png");
    this.load.image("layer07_Sky", "assets/castle/layer07_Sky.png");




    for (let index = 0; index < 15; index++) {

      if (index < 10) {
        this.load.image(`0_Warrior_Run_00${index}`, `assets/run/0_Warrior_Run_00${index}.png`);
      } else {
        this.load.image(`0_Warrior_Run_0${index}`, `assets/run/0_Warrior_Run_0${index}.png`);
      }

    }

    for (let index = 0; index < 24; index++) {

      if (index < 10) {
        this.load.image(`Walking_00${index}`, `assets/walk-warriorHelmet/Walking_00${index}.png`);
      } else {
        this.load.image(`Walking_0${index}`, `assets/walk-warriorHelmet/Walking_0${index}.png`);
      }

    }

    this.load.animation('runWarriorAnim', 'assets/animations/run-animation.json');
    this.load.animation('walkWarriorHelmetAnim', 'assets/animations/walk-warriorHelmet.json');


    // load spritesheet
    this.load.spritesheet("player", "assets/bee.png", {
      frameWidth: 37,
      frameHeight: 39,
    });

    this.load.spritesheet("warrior", "assets/warrior.png", {
      frameWidth: 70,
      frameHeight: 100,
    });

    this.load.spritesheet("coin", "assets/coin.png", {
      frameWidth: 100,
      frameHeight: 100,
    });

    this.load.spritesheet("warriorHelmet", "assets/warriorHelmet.png", {
      frameWidth: 55,
      frameHeight: 100,
    });

    this.load.image("LeanTech_Color", "assets/LeanTech_Color.png");
    this.load.image("LeanTech_White", "assets/LeanTech_White.png");


  }
  create() {
    this.scene.start("InitialScene");
  }
}

import { Scene } from "phaser";
import GameScene from "../js/GameScene";
import GameInputs from "../js/inputs/GameInputs";

export enum PlayerStates {
  FALLING,
  STANDING,
  JUMPING,
  WALKING,
}

export default class BrownWarrior extends Phaser.Physics.Arcade.Sprite {
  public scene: Scene;
  public body: Phaser.Physics.Arcade.Body;
  private inputs: GameInputs;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, "warrior");
    this.inputs = new GameInputs(scene.input);
    this.scene = scene;
    const animations: Phaser.Types.Animations.Animation[] = [
      { key: "stand", frames: this.scene.anims.generateFrameNumbers("warrior", { frames: [0] }), },
      {
        key: "walk",
        frameRate: 25,
        frames: this.scene.anims.generateFrameNumbers("warrior"),
        repeat: -1,
      },
      { key: "jump", frames: this.scene.anims.generateFrameNumbers("warrior", { frames: [10] }) },
    ];
    animations.forEach((animation) => this.scene.anims.create(animation));

    this.scene.physics.world.enable(this);



    this.scene.add
      .existing(this)
      .setScale(0.8)
      .setBounce(0.2)

      .setVelocityX(270)
      .setState(PlayerStates.STANDING);
  }

  public setState(value: PlayerStates) {
    switch (value) {

      case PlayerStates.FALLING:
        this.play("jump");
        break;

      case PlayerStates.JUMPING:
        this.setVelocityY(-430).play("jump").playAudio("jump");
        break;

      case PlayerStates.STANDING:
        this
          .play("stand");
        break;

      case PlayerStates.WALKING:
        this.play("walk");
        break;
    }

    return super.setState(value);
  }

  public preUpdate(time: number, delta: number) {
    const { left, right, down, jump } = this.inputs;
    const flipX = left && !right ? true : right ? false : this.flipX;

    switch (this.state) {
      case PlayerStates.STANDING:
        if (!this.body.onFloor()) {
          this.setState(PlayerStates.FALLING);

        } else if (jump) {
          this.setState(PlayerStates.JUMPING);
        } else if (left || right) {
          this.setVelocityX(0);
          this.setState(PlayerStates.WALKING);
        }
        break;

      case PlayerStates.WALKING:
        this.setFlipX(flipX);
        //this.setAccelerationX(accelerationX);

        if (!this.body.onFloor()) {
          this.setState(PlayerStates.FALLING);
        } else if (jump) {
          this.setState(PlayerStates.JUMPING);

        } else if (left) {
          this.setVelocityX(-270);

        } else if (right) {
          this.setVelocityX(270);
        } else if (!left && !right) {
          this.setVelocityX(0);
          this.setState(PlayerStates.STANDING);
        }
        break;


      case PlayerStates.JUMPING:
        if (this.body.velocity.y > 0) {
          this.setState(PlayerStates.FALLING);
        } else if (!jump) {
          this.setVelocityY(this.body.velocity.y);

        }
        if (right) {
          this.setVelocityX(270);

        } else if (left) {
          this.setVelocityX(-270);

        }

      case PlayerStates.FALLING:
        this.setFlipX(flipX);
        //this.setAccelerationX(accelerationX);

        if (this.body.onFloor()) {
          if (left || right) {
            this.setState(PlayerStates.WALKING);
          } else {
            this.setVelocityX(0);
            this.setState(PlayerStates.STANDING);
          }
        }
        break;
    }

    super.preUpdate(time, delta);
  }

  public setSize(height: number) {
    super.setSize(16, height);

    this.body.setOffset(0, this.height - height);

    return this;
  }

  public playAudio(key: string) {

    return this;
  }

  // preUpdate(time, delta): void {
  //   const { left, right, jump } = this.inputs;

  //   if (right) {
  //     this.setVelocityX(250);

  //   }
  //   else if (jump && this.body.touching.down) {
  //     this.setVelocityY(-360);
  //   }
  //   // else if (this.cursors.left.isDown) {
  //   //   this.warrior.setVelocityX(-180);
  //   // }
  //   else {
  //     this.setVelocityX(250);

  //   }

  //   super.preUpdate(time, delta);

  // }
}

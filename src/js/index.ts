import { Game } from "phaser";
import { playGameCastle } from "./playGameCastle";
import { preloadGame } from "./preloadGame";
import { preloadGameForestCartoon } from "./forestCartoon/preloadForestCartoon";
import { playGameForestCartoon } from "./forestCartoon/playGameForestCartoon";
import { playGameForest } from "./playGameForest";
import { InitialScene } from "./InitialScene";
export var game;
window.onload = function () {
  const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 844,
    height: 620,
    parent: 'main',
    input: {
      keyboard: true,
      gamepad: true,
    },
    render: {
      pixelArt: true,
      antialias: false,
      antialiasGL: false,
    },
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
        gravity: {
          y: 500
        }
      }
    },
    scene: [preloadGame, InitialScene, playGameForest]
  }
  game = new Game(gameConfig);
}

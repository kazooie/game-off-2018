/// <reference path="./phaser.d.ts"/>

import 'phaser';
import {MainScene} from './scenes/main';
import {MenuScene} from './scenes/menu';
import {GAME_WIDTH, GAME_HEIGHT} from './constants';

const config: GameConfig = {
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [MenuScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 200},
    },
  },
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};

/// <reference path="./phaser.d.ts"/>

import 'phaser';
import {MenuScene} from './scenes/menu';
import {GAME_WIDTH, GAME_HEIGHT} from './constants';
import {PlatformScene} from './scenes/platform';
import {TetrisScene} from './scenes/tetris';
import {LoadScene} from './scenes/load';

const config: GameConfig = {
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [LoadScene, MenuScene, PlatformScene, TetrisScene],
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

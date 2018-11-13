import 'phaser';
import {GAME_HEIGHT, GAME_WIDTH} from './constants';
import {LoadScene} from './scenes/load';
import {MenuScene} from './scenes/menu';
import {PlatformScene} from './scenes/platform';
import {TetrisScene} from './scenes/tetris';

const query = new URLSearchParams(window.location.search);

const config: GameConfig = {
  height: GAME_HEIGHT,
  parent: 'game',
  physics: {
    arcade: {
      debug: query.has('debug'),
      gravity: {y: 500},
    },
    default: 'arcade',
  },
  scene: [LoadScene, MenuScene, PlatformScene, TetrisScene],
  type: Phaser.AUTO,
  width: GAME_WIDTH,
};

export class Game extends Phaser.Game {}

window.onload = () => {
  const game = new Game(config);
};

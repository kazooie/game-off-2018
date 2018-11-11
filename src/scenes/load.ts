import * as PlatformScene from './platform';
import * as TetrisScene from './tetris';

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Scene.Load',
    });
  }

  preload(): void {
    this.load.audio('click', ['./assets/audio/menu/click.ogg']);
    this.load.spritesheet('button.gray', './assets/menu/button.gray.png', {
      frameWidth: 190,
      frameHeight: 49,
      startFrame: 1,
    });
    this.load.image('player', './assets/placeholder/player.png');
    this.load.spritesheet('tiles', './assets/placeholder/tiles.png', {
      frameWidth: 70,
      frameHeight: 70,
    });
    this.load.tilemapTiledJSON('map', './assets/placeholder/map.json');
  }
  create(): void {
    this.scene.start('Scene.Menu');
  }
}

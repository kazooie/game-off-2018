import {Scene} from 'phaser';
import {GAME_WIDTH, GAME_HEIGHT, ASSET_KEYS} from '../constants';
import {MenuButton} from '../components/menu-button';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: ASSET_KEYS.SCENES.MENU,
    });
  }
  create(): void {
    new MenuButton(this, {
      label: 'Start Game',
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      onClick: () => {
        this.scene.start(ASSET_KEYS.SCENES.PLATFORM);
      },
    });

    new MenuButton(this, {
      label: 'Options',
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2 + 80,
      onClick: () => this.scene.start(ASSET_KEYS.SCENES.OPTIONS),
    });
  }
}

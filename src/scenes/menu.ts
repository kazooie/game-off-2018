import {Scene} from 'phaser';
import {MenuButton} from '../components/menu-button';
import {ASSET_KEYS, GAME_HEIGHT, GAME_WIDTH} from '../constants';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: ASSET_KEYS.SCENES.MENU,
    });
  }
  public create(): void {
    const menuButton1 = new MenuButton(this, {
      label: 'Start Game',
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,

      onClick: () => {
        this.scene.start(ASSET_KEYS.SCENES.PLATFORM);
      },
    });

    const menuButton2 = new MenuButton(this, {
      label: 'Options',
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2 + 80,

      onClick: () => this.scene.start(ASSET_KEYS.SCENES.OPTIONS),
    });
  }
}

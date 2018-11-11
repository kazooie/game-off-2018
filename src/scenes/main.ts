import {GAME_WIDTH, GAME_HEIGHT} from '../constants';

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: 'Scene.Main',
    });
  }

  preload(): void {}

  create(): void {
    const text = this.add.text(0, 0, 'MAIN SCENE', {
      color: '#fff',
      fontFamily: 'Titillium Web',
      fontSize: 24,
      align: 'center',
    });
    Phaser.Display.Bounds.CenterOn(text, GAME_WIDTH / 2, GAME_HEIGHT / 2);
  }
}

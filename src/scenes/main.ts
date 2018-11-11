export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: 'MainScene',
    });
  }

  preload(): void {}

  create(): void {
    const text = this.add.text(345, 285, 'MAIN SCENE', {
      color: '#fff',
      fontFamily: 'Titillium Web',
      fontSize: 24,
      align: 'center',
    });
  }
}

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Menu',
    });
  }

  preload(): void {
    this.load.image('button', './assets/menu/grey_button06.png');
  }

  create(): void {
    const button = this.add.image(400, 300, 'button').setInteractive();
    const text = this.add.text(345, 285, 'Start Game', {
      color: '#000',
      fontFamily: 'Titillium Web',
      fontSize: 24,
      align: 'center',
    });
    button.on('pointerup', ev => {
      this.scene.start('MainScene');
    });
    button.on('pointerover', () => {
      text.setStyle({ ...text.style, color: '#d00 ' });
    });
    button.on('pointerout', () => {
      text.setStyle({ ...text.style, color: '#000 ' });
    });
  }
}

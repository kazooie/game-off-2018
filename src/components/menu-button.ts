import {ASSET_KEYS} from '../constants';

interface TextButtonOptions {
  label: string;
  x: number;
  y: number;
  onClick: () => void;
}

export class MenuButton {
  private button: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, options: TextButtonOptions) {
    this.button = scene.add
      .sprite(options.x, options.y, ASSET_KEYS.SPRITESHEETS.BUTTON_GRAY)
      .setInteractive() as Phaser.GameObjects.Sprite;

    this.text = scene.add.text(0, 0, options.label, {
      color: '#000',
      fontFamily: 'Titillium Web',
      fontSize: 24,
    });

    this.up();

    this.button.on('pointerdown', () => {
      this.down();
    });

    this.button.on('pointerup', ev => {
      this.up();
      scene.sound.play(ASSET_KEYS.AUDIO.CLICK);
      setTimeout(() => {
        options.onClick();
      }, 100);
    });

    this.button.on('pointerout', () => {
      this.up();
    });
  }

  private up = () => {
    this.button.setFrame(0);
    Phaser.Display.Bounds.CenterOn(
      this.text,
      Phaser.Display.Bounds.GetCenterX(this.button),
      Phaser.Display.Bounds.GetCenterY(this.button) - 3
    );
  };

  private down = () => {
    this.button.setFrame(1);
    Phaser.Display.Bounds.CenterOn(
      this.text,
      Phaser.Display.Bounds.GetCenterX(this.button),
      Phaser.Display.Bounds.GetCenterY(this.button)
    );
  };
}

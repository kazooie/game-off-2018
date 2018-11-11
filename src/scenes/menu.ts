import {GAME_WIDTH, GAME_HEIGHT} from '../constants';
import {Scene} from 'phaser';

interface TextButtonOptions {
  label: string;
  x: number;
  y: number;
  onClick: () => void;
}

class MenuButton {
  private button: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Scene, options: TextButtonOptions) {
    this.button = scene.add
      .sprite(options.x, options.y, 'button.gray')
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
      setTimeout(() => {
        options.onClick();
      }, 100);
    });

    this.button.on('pointerout', () => {
      this.text.setStyle({...this.text.style, color: '#000 '});
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

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Scene.Menu',
    });
  }

  preload(): void {
    this.load.spritesheet('button.gray', './assets/menu/button.gray.png', {
      frameWidth: 190,
      frameHeight: 49,
      startFrame: 1,
    });
  }

  create(): void {
    new MenuButton(this, {
      label: 'Start Game',
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      onClick: () => this.scene.start('Scene.Main'),
    });

    new MenuButton(this, {
      label: 'Options',
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2 + 80,
      onClick: () => this.scene.start('Scene.Options'),
    });
  }
}

import {ASSET_KEYS, PLAYER_SPEED} from '../constants';
import Scene = Phaser.Scene;

export interface PlayerParams {
  scene: Scene;
  x: number;
  y: number;
  key?: string;
  frame?: string | integer;
}

export class Player extends Phaser.GameObjects.Sprite {
  public cursorKeys: CursorKeys;

  constructor(params: PlayerParams) {
    const {scene, x, y, key, frame} = {
      // Default params
      key: ASSET_KEYS.IMAGES.PLAYER,
      ...params,
    };

    super(scene, x, y, key, frame);

    // Image
    this.setOrigin(0, 0);

    // Physics
    scene.physics.world.enable(this);
    this.body.setSize(16, 32);
    this.body.setGravityY(600);
    this.body.setCollideWorldBounds(true);

    // Input
    this.cursorKeys = scene.input.keyboard.createCursorKeys();

    scene.add.existing(this);
  }

  public update() {
    this.handleInput();
  }

  private handleInput() {
    const {left, right, space} = this.cursorKeys;

    if (left.isDown) {
      this.setFlipX(true);
      this.body.setVelocityX(-1 * PLAYER_SPEED);
    } else if (right.isDown) {
      this.setFlipX(false);
      this.body.setVelocityX(PLAYER_SPEED);
    } else {
      this.body.setVelocityX(0);
    }

    if (space.isDown && this.body.onFloor()) {
      this.body.setVelocityY(-500);
    }
  }
}

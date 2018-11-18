import {ASSET_KEYS, PLAYER_SPEED} from '../constants';
import Scene = Phaser.Scene;

export interface PlayerParams {
  scene: Scene;
  x: number;
  y: number;
  key?: string;
  frame?: string | integer;
}

export interface PlayerAnimationState {
  jumping: boolean;
  running: boolean;
}

export class Player extends Phaser.GameObjects.Sprite {
  public cursorKeys: CursorKeys;
  private animState: PlayerAnimationState;

  constructor(params: PlayerParams) {
    const {scene, x, y, key, frame} = {
      // Default params
      key: ASSET_KEYS.IMAGES.PLAYER,
      ...params,
    };

    super(scene, x, y, key, frame);

    // Image
    this.setOrigin(0, 0);
    this.setScale(1 / 12, 1 / 12);

    // Physics
    scene.physics.world.enable(this);
    this.body.setSize(650, 500);
    this.body.setGravityY(1000);
    this.body.setCollideWorldBounds(true);

    // Input
    this.cursorKeys = scene.input.keyboard.createCursorKeys();

    scene.add.existing(this);

    this.animState = {
      jumping: false,
      running: false,
    };
  }

  public update() {
    this.handleInput();
  }

  public isStoppedHorizontally() {
    return !this.body.velocity.x || Math.abs(this.body.velocity.x) < 1;
  }

  public getCurrentVelocityDirection(): 'left' | 'right' {
    return this.body.velocity.x > 0 ? 'right' : 'left';
  }

  private handleInput() {
    const {left, right, space} = this.cursorKeys;

    // Reset these after every frame
    this.body.setAcceleration(0);
    this.animState.running = false;

    if (this.body.onFloor()) {
      // Ground movement
      this.animState.jumping = false;
      this.handleHorizontalMovement();
      if (space.isDown) {
        this.body.setVelocityY(-600);
      }
    } else {
      this.animState.jumping = true;
      // Aerial movement
      const dir = this.getCurrentVelocityDirection();
      const maxHorizontalVelocity =
        Math.abs(this.body.velocity.x) >= PLAYER_SPEED;

      if (
        (!left.isDown && !right.isDown) ||
        (left.isDown && dir === 'right') ||
        (right.isDown && dir === 'left')
      ) {
        this.body.setVelocityX(0);
      }
      if (left.isDown && (!maxHorizontalVelocity || dir === 'right')) {
        this.body.setAccelerationX(-1600);
      } else if (right.isDown && (!maxHorizontalVelocity || dir === 'left')) {
        this.body.setAccelerationX(1600);
      }
      if (this.body.velocity.y < 0) {
        // Still moving up
        if (!space.isDown) {
          // Stop moving up when space is released
          this.body.setAccelerationY(5000);
        }
      } else {
        // On the way down
        this.body.setAccelerationY(1000);
      }
    }

    // Handle sprite direction
    if (!this.isStoppedHorizontally()) {
      this.setFlipX(this.getCurrentVelocityDirection() === 'left');
    }
  }

  private handleHorizontalMovement() {
    const {left, right} = this.cursorKeys;

    if (left.isDown) {
      this.body.setVelocityX(-1 * PLAYER_SPEED);
      this.animState.running = true;
    } else if (right.isDown) {
      this.body.setVelocityX(PLAYER_SPEED);
      this.animState.running = true;
    } else {
      this.body.setVelocityX(0);
    }
  }
}

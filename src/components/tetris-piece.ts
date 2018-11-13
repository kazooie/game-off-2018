import {ASSET_KEYS, CELL_SIZE, WORLD_HEIGHT, WORLD_WIDTH} from '../constants';
import {Cell, CellType} from '../types';

export class TetrisPiece {
  public group: Phaser.GameObjects.Group;
  private scene: Phaser.Scene;
  private piece: Phaser.GameObjects.Container;
  private worldPosition: {x: number; y: number};
  private blockLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private shape: Cell[];
  private callback: (blocks: Cell[]) => void;
  private moveTween: Phaser.Tweens.Tween;

  constructor(
    scene: Phaser.Scene,
    blockLayer: Phaser.Tilemaps.DynamicTilemapLayer,
    callback: (blocks: Cell[]) => void
  ) {
    this.scene = scene;
    this.blockLayer = blockLayer;
    this.callback = callback;

    this.group = new Phaser.GameObjects.Group(this.scene);
    this.shape = [
      {x: 0, y: 0, type: CellType.GRASS},
      {x: 1, y: 0, type: CellType.GRASS},
      {x: 2, y: 0, type: CellType.GRASS},
      {x: 3, y: 0, type: CellType.GRASS},
    ];

    this.piece = scene.add.container(
      0,
      0,
      this.shape.map((b, i) => {
        const block = scene.physics.add.image(
          b.x * CELL_SIZE,
          b.y * CELL_SIZE,
          ASSET_KEYS.SPRITESHEETS.TILES,
          b.type
        );
        block.setOrigin(0, 0);
        block.body.setAllowGravity(false);
        this.group.add(block);
        return block;
      })
    );
    this.setPosition(2, 10);
  }

  public destroy = () => {
    this.piece.destroy();
  };

  public moveLeft = () => {
    if (this.isMoving()) {
      return;
    }
    if (this.worldPosition.x <= 0) {
      return;
    }
    if (this.areThereBlocksAt(-1, 0)) {
      return;
    }
    this.setPosition(this.worldPosition.x - 1, this.worldPosition.y, true);
  };

  public moveRight = () => {
    if (this.isMoving()) {
      return;
    }
    for (const cell of this.shape) {
      if (this.cellX(cell) + 1 >= WORLD_WIDTH) {
        return;
      }
    }
    if (this.areThereBlocksAt(1, 0)) {
      return;
    }
    this.setPosition(this.worldPosition.x + 1, this.worldPosition.y, true);
  };

  public moveDown = () => {
    if (this.isMoving()) {
      return;
    }
    for (const cell of this.shape) {
      if (this.cellY(cell) + 1 >= WORLD_HEIGHT) {
        this.die();
        return;
      }
    }
    if (this.areThereBlocksAt(0, 1)) {
      this.die();
      return;
    }
    this.setPosition(this.worldPosition.x, this.worldPosition.y + 1, true);
  };

  private die = () => {
    this.callback(
      this.shape.map(s => ({
        type: s.type,
        x: s.x + this.worldPosition.x,
        y: s.y + this.worldPosition.y,
      }))
    );
  };

  private cellX = (cell: Cell) => {
    return cell.x + this.worldPosition.x;
  };

  private cellY = (cell: Cell) => {
    return cell.y + this.worldPosition.y;
  };

  private areThereBlocksAt = (dx: number, dy: number): boolean => {
    for (const cell of this.shape) {
      const block = this.blockLayer.getTileAt(
        this.worldPosition.x + cell.x + dx,
        this.worldPosition.y + cell.y + dy
      );
      if (block !== null) {
        return true;
      }
    }
    return false;
  };

  private setPosition(x: number, y: number, animate: boolean = false) {
    this.worldPosition = {x, y};
    if (animate) {
      this.animateToPosition(CELL_SIZE * x, CELL_SIZE * y);
    } else {
      this.piece.setPosition(CELL_SIZE * x, CELL_SIZE * y);
    }
  }

  private isMoving = () => {
    return this.moveTween && !this.moveTween.complete;
  };

  private animateToPosition(x: number, y: number) {
    this.moveTween = this.scene.tweens.add({
      duration: 500,
      ease: 'Cubic',
      repeat: 0,
      targets: this.piece,
      x,
      y,
      yoyo: false,
    });
  }
}

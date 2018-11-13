import {ASSET_KEYS, CELL_SIZE, WORLD_HEIGHT, WORLD_WIDTH} from '../constants';
import {theStore} from '../store';
import {Cell} from '../types';
import {SwitchableScene} from './switchable';

export class PlatformScene extends SwitchableScene {
  private map: Phaser.Tilemaps.Tilemap;
  private groundTiles: Phaser.Tilemaps.Tileset;
  private groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private staticLayer: Phaser.Tilemaps.StaticTilemapLayer;
  private cursors: any;
  private player: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super(
      {
        key: ASSET_KEYS.SCENES.PLATFORM,
      },
      ASSET_KEYS.SCENES.TETRIS
    );
  }

  public create(): void {
    this.initSwitching();

    this.map = this.make.tilemap({key: ASSET_KEYS.TILEMAPS.MAP});
    this.groundTiles = this.map.addTilesetImage(ASSET_KEYS.SPRITESHEETS.TILES);
    this.createGroundLayer();

    this.player = this.physics.add.sprite(
      CELL_SIZE * 6,
      CELL_SIZE * 17,
      ASSET_KEYS.IMAGES.PLAYER
    );

    this.groundLayer.setCollisionByExclusion([-1]);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.groundLayer, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBackgroundColor('#444');

    this.events.addListener('sleep', () =>
      theStore.setWorld(this.calculateWorld())
    );

    this.events.addListener('wake', () => {
      this.clearGroundLayer();
      theStore.getWorld().map(cell => {
        this.groundLayer
          .putTileAt(cell[2], cell[0], cell[1])
          .setCollision(true);
      });
    });
  }

  public update() {
    if (this.cursors.left.isDown) {
      this.player.setFlipX(true);
      this.player.body.setVelocityX(-50);
    } else if (this.cursors.right.isDown) {
      this.player.setFlipX(false);
      this.player.body.setVelocityX(50);
    } else {
      this.player.body.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.onFloor) {
      this.player.body.setVelocityY(-100);
    }
  }

  private clearGroundLayer = () => {
    this.groundLayer
      .getTilesWithin(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
      .forEach(tile => this.groundLayer.removeTileAt(tile.x, tile.y, 0));
  };

  private calculateWorld = (): Cell[] => {
    return this.groundLayer
      .getTilesWithin(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
      .filter(tile => tile.index >= 0)
      .map(tile => {
        return [tile.x, tile.y, tile.index];
      });
  };

  private createGroundLayer = () => {
    if (this.groundLayer) {
      this.groundLayer.destroy();
    }
    this.groundLayer = this.map.createDynamicLayer(
      'level-01',
      this.groundTiles,
      0,
      0
    );
    this.clearGroundLayer();
    for (let x = 0; x < WORLD_WIDTH; x += 1) {
      this.groundLayer.putTileAt(1, x, 18);
    }
  };
}

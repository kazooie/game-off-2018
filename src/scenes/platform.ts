import {
  ASSET_KEYS,
  CELL_SIZE,
  PLAYER_SPEED,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from '../constants';
import {theStore} from '../store';
import {Cell} from '../types';
import {SwitchableScene} from './switchable';

export class PlatformScene extends SwitchableScene {
  private map: Phaser.Tilemaps.Tilemap;
  private groundTiles: Phaser.Tilemaps.Tileset;
  private groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
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
    super.create();

    this.createTiles();
    this.createGroundLayer();
    this.createPlayer();

    const start = this.groundLayer.findByIndex(73);
    this.player.setPosition(start.pixelX, start.pixelY);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBackgroundColor('#444');

    this.events.addListener('sleep', () =>
      SwitchableScene.saveWorldFromLayer(this.groundLayer)
    );

    this.events.addListener('wake', () =>
      SwitchableScene.buildLayerFromWorld(this.groundLayer)
    );
  }

  public update() {
    if (this.cursors.left.isDown) {
      this.player.setFlipX(true);
      this.player.body.setVelocityX(-1 * PLAYER_SPEED);
    } else if (this.cursors.right.isDown) {
      this.player.setFlipX(false);
      this.player.body.setVelocityX(PLAYER_SPEED);
    } else {
      this.player.body.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.body.setVelocityY(-200);
    }
  }

  private createPlayer = () => {
    this.player = this.physics.add.sprite(0, 0, ASSET_KEYS.IMAGES.PLAYER);
    this.player.setSize(16, 32);

    this.groundLayer.setCollisionByExclusion([-1, 58, 57, 73, 77]);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.groundLayer, this.player);
  };

  private createTiles = () => {
    this.map = this.make.tilemap({key: ASSET_KEYS.TILEMAPS.MAP});
    this.groundTiles = this.map.addTilesetImage(ASSET_KEYS.SPRITESHEETS.TILES);
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
  };
}

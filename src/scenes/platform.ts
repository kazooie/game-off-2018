import {ASSET_KEYS} from '../constants';
import {Player} from '../objects/player';
import {SwitchableScene} from './switchable';

export class PlatformScene extends SwitchableScene {
  private map: Phaser.Tilemaps.Tilemap;
  private groundTiles: Phaser.Tilemaps.Tileset;
  private groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private player: Player;

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

    const start = this.groundLayer.findByIndex(73);
    this.player = new Player({
      scene: this,
      x: start.pixelX,
      y: start.pixelY,
    });
    this.groundLayer.setCollisionByExclusion([-1, 58, 57, 73, 77]);
    this.physics.add.collider(this.player, this.groundLayer);

    this.cameras.main.setBackgroundColor('#444');

    this.events.addListener('sleep', () =>
      SwitchableScene.saveWorldFromLayer(this.groundLayer)
    );

    this.events.addListener('wake', () =>
      SwitchableScene.buildLayerFromWorld(this.groundLayer)
    );
  }

  public update() {
    this.player.update();
  }

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

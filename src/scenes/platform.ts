import {ASSET_KEYS} from '../constants';
import {SwitchableScene} from './switchable';

export class PlatformScene extends SwitchableScene {
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

    const map = this.make.tilemap({key: ASSET_KEYS.TILEMAPS.MAP});
    const groundTiles = map.addTilesetImage(ASSET_KEYS.SPRITESHEETS.TILES);
    // create the ground layer
    const groundLayer = map.createDynamicLayer('level-01', groundTiles, 0, 0);

    groundLayer.putTileAt(1, 4, 5);
    // groundLayer.putTileAtWorldXY(2, 200, 50);

    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    const player = this.physics.add.sprite(50, 600, ASSET_KEYS.IMAGES.PLAYER);
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    player.setBounce(0.2); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map

    this.physics.add.collider(groundLayer, player);

    const cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBackgroundColor('#444');
  }
}

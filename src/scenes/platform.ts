import {TetrisScene} from './tetris';
import {SwitchableScene} from './switchable';

export class PlatformScene extends SwitchableScene {
  public static KEY = 'Scene.Platform';

  constructor() {
    super(
      {
        key: PlatformScene.KEY,
      },
      TetrisScene.KEY
    );
  }
  preload(): void {}

  create(): void {
    this.initSwitching();

    const map = this.make.tilemap({key: 'map'});
    const groundTiles = map.addTilesetImage('tiles');
    // create the ground layer
    const groundLayer = map.createDynamicLayer(
      'Tile Layer 1',
      groundTiles,
      0,
      0
    );
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    const player = this.physics.add.sprite(50, 600, 'player');
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    player.setBounce(0.2); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map

    this.physics.add.collider(groundLayer, player);

    const cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBackgroundColor('#444');
  }

  update(): void {}
}

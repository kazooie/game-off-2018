import {TetrisPiece} from '../components/tetris-piece';
import {ASSET_KEYS, CELL_SIZE, WORLD_HEIGHT, WORLD_WIDTH} from '../constants';
import {theStore} from '../store';
import {SwitchableScene} from './switchable';

export class TetrisScene extends SwitchableScene {
  private timer: Phaser.Time.TimerEvent;
  private piece: TetrisPiece;
  private blockLayer: Phaser.Tilemaps.DynamicTilemapLayer;

  constructor() {
    super(
      {
        key: ASSET_KEYS.SCENES.TETRIS,
      },
      ASSET_KEYS.SCENES.PLATFORM
    );
  }

  public create(): void {
    this.initSwitching();
    this.createBlockLayer();

    this.events.on('wake', () => {
      this.loadFromStore();
      this.createPiece();
    });

    this.loadFromStore();

    this.events.on('sleep', () => {
      this.piece.destroy();
      theStore.setWorld(
        this.blockLayer
          .getTilesWithin(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
          .filter(tile => tile.index >= 0)
          .map(tile => {
            return [tile.x, tile.y, tile.index];
          })
      );
    });

    this.createPiece();

    this.input.keyboard.addListener('keyup_LEFT', () => {
      if (this.piece) {
        this.piece.moveLeft();
      }
    });

    this.input.keyboard.addListener('keyup_RIGHT', () => {
      if (this.piece) {
        this.piece.moveRight();
      }
    });

    const moveConfig = {
      callback: () => {
        if (this.piece) {
          this.piece.moveDown();
        }
      },
      delay: 1000,
      repeat: -1,
    };

    this.input.keyboard.addListener('keyup_DOWN', () => {
      if (this.piece) {
        this.piece.moveDown();
        this.timer.reset(moveConfig);
      }
    });

    this.timer = this.time.addEvent(moveConfig);
  }

  private loadFromStore = () => {
    const world = theStore.getWorld();
    world.forEach(cell => {
      this.blockLayer.putTileAt(cell[2], cell[0], cell[1]);
    });
  };

  private createBlockLayer = () => {
    const map = this.make.tilemap({key: ASSET_KEYS.TILEMAPS.MAP});
    const blockTiles = map.addTilesetImage(ASSET_KEYS.SPRITESHEETS.TILES);
    this.blockLayer = map.createDynamicLayer('blank', blockTiles, 0, 0);
  };

  private createPiece = () => {
    this.piece = new TetrisPiece(
      this,
      this.blockLayer,
      (blocks: number[][]) => {
        blocks.forEach(block =>
          this.blockLayer.putTileAt(block[2] + 1, block[0], block[1])
        );
        this.piece.destroy();
        this.createPiece();
      }
    );
  };
}

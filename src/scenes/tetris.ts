import {TetrisPiece} from '../components/tetris-piece';
import {ASSET_KEYS, CELL_SIZE, WORLD_HEIGHT, WORLD_WIDTH} from '../constants';
import {Cell} from '../types';
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
    super.create();

    this.createBlockLayer();

    this.events.on('wake', () => {
      SwitchableScene.buildLayerFromWorld(this.blockLayer);
      this.createPiece();
    });

    SwitchableScene.buildLayerFromWorld(this.blockLayer);

    this.events.on('sleep', () => {
      this.piece.destroy();
      SwitchableScene.saveWorldFromLayer(this.blockLayer);
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

  private createBlockLayer = () => {
    const map = this.make.tilemap({key: ASSET_KEYS.TILEMAPS.MAP});
    const blockTiles = map.addTilesetImage(ASSET_KEYS.SPRITESHEETS.TILES);
    this.blockLayer = map.createDynamicLayer('blank', blockTiles, 0, 0);
  };

  private createPiece = () => {
    this.piece = new TetrisPiece(this, this.blockLayer, (blocks: Cell[]) => {
      blocks.forEach(block =>
        this.blockLayer.putTileAt(block.type + 1, block.x, block.y)
      );
      this.piece.destroy();
      this.createPiece();
    });
  };
}

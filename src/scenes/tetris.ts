import {ASSET_KEYS} from '../constants';
import {SwitchableScene} from './switchable';

export class TetrisScene extends SwitchableScene {
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
  }
}

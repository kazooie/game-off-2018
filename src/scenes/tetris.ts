import {ASSET_KEYS} from '../constants';
import {SwitchableScene} from './switchable';

export class TetrisScene extends SwitchableScene {
  constructor(switchScene: string) {
    super(
      {
        key: ASSET_KEYS.SCENES.TETRIS,
      },
      ASSET_KEYS.SCENES.PLATFORM
    );
  }

  create(): void {
    this.initSwitching();
    this.events.on('wake', () => {
      console.log('tetris!');
    });
  }

  update(): void {}
}

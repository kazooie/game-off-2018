import {PlatformScene} from './platform';
import {SWITCH_KEY} from '../constants';
import {SwitchableScene} from './switchable';

export class TetrisScene extends SwitchableScene {
  public static KEY = 'Scene.Tetris';

  constructor(switchScene: string) {
    super(
      {
        key: TetrisScene.KEY,
      },
      PlatformScene.KEY
    );
  }

  create(): void {
    this.initSwitching();
  }

  update(): void {}
}

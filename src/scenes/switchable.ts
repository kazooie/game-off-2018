import {SWITCH_KEY} from '../constants';

export class SwitchableScene extends Phaser.Scene {
  private canSwitch: boolean = true;
  private switchScene: string;

  constructor(
    config: string | Phaser.Scenes.Settings.Config,
    switchScene: string
  ) {
    super(config);
    this.switchScene = switchScene;
  }

  private switch() {
    if (!this.canSwitch) {
      return;
    }
    this.scene.switch(this.switchScene);
    this.canSwitch = false;
  }

  protected initSwitching() {
    this.input.keyboard.on(`keyup_${SWITCH_KEY}`, () => {
      this.switch();
    });

    this.events.on('wake', () => {
      this.canSwitch = true;
    });
  }

  create() {
    throw new Error('DO NOT USE THIS CLASS DIRECTLY!');
  }
}

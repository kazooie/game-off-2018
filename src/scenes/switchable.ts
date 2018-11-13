import {SWITCH_KEY, WORLD_HEIGHT, WORLD_WIDTH} from '../constants';
import {theStore} from '../store';
import {Cell} from '../types';

/**
 * Abstract class that handles the logic for switching between the two game modes.
 */
export class SwitchableScene extends Phaser.Scene {
  protected static saveWorldFromLayer = (
    layer: Phaser.Tilemaps.DynamicTilemapLayer
  ) => {
    theStore.setWorld(
      layer
        .getTilesWithin(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
        .filter(tile => tile.index >= 0)
        .map(tile => {
          return {x: tile.x, y: tile.y, type: tile.index};
        })
    );
  };

  protected static clearLayer = (
    layer: Phaser.Tilemaps.DynamicTilemapLayer
  ) => {
    layer
      .getTilesWithin(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
      .forEach(tile => layer.removeTileAt(tile.x, tile.y, 0));
  };

  protected static buildLayerFromWorld = (
    layer: Phaser.Tilemaps.DynamicTilemapLayer
  ) => {
    SwitchableScene.clearLayer(layer);
    theStore.getWorld().map(cell => {
      layer.putTileAt(cell.type, cell.x, cell.y);
    });
  };

  private canSwitch: boolean = true;
  private switchScene: string;

  constructor(
    config: string | Phaser.Scenes.Settings.Config,
    switchScene: string
  ) {
    super(config);
    this.switchScene = switchScene;
  }

  public create() {
    this.input.keyboard.on(`keyup_${SWITCH_KEY}`, () => {
      this.switch();
    });

    this.events.on('wake', () => {
      this.canSwitch = true;
    });
  }

  private switch() {
    if (!this.canSwitch) {
      return;
    }
    this.scene.switch(this.switchScene);
    this.canSwitch = false;
  }
}

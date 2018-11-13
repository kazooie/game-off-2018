import {ASSET_KEYS} from '../constants';

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: ASSET_KEYS.SCENES.LOAD,
    });
  }

  public preload(): void {
    this.load.audio(ASSET_KEYS.AUDIO.CLICK, ['./assets/audio/menu/click.ogg']);
    this.load.spritesheet(
      ASSET_KEYS.SPRITESHEETS.BUTTON_GRAY,
      './assets/menu/button.gray.png',
      {
        frameHeight: 49,
        frameWidth: 190,
        startFrame: 1,
      }
    );
    this.load.image(
      ASSET_KEYS.IMAGES.PLAYER,
      './assets/placeholder/player.png'
    );
    this.load.spritesheet(
      ASSET_KEYS.SPRITESHEETS.TILES,
      './assets/placeholder/tiles.png',
      {
        frameHeight: 32,
        frameWidth: 32,
      }
    );
    this.load.tilemapTiledJSON(
      ASSET_KEYS.TILEMAPS.MAP,
      './assets/placeholder/map.json'
    );
  }

  public create(): void {
    this.scene.start(ASSET_KEYS.SCENES.PLATFORM);
  }
}

export const CELL_SIZE = 32;
export const WORLD_WIDTH = 12;
export const WORLD_HEIGHT = 20;
export const GAME_WIDTH = CELL_SIZE * WORLD_WIDTH;
export const GAME_HEIGHT = CELL_SIZE * WORLD_HEIGHT;

// The keyboard key that is used for switching between game modes.
export const SWITCH_KEY = 'SPACE';

export const PLAYER_SPEED = 100;

export const ASSET_KEYS = {
  AUDIO: {
    CLICK: 'audio.click',
  },
  IMAGES: {
    PLAYER: 'player',
  },
  SCENES: {
    LOAD: 'scene.load',
    MENU: 'scene.menu',
    OPTIONS: 'scene.options',
    PLATFORM: 'scene.platform',
    TETRIS: 'scene.tetris',
  },
  SPRITESHEETS: {
    BUTTON_GRAY: 'button.gray',
    TILES: 'tiles',
  },
  TILEMAPS: {
    MAP: 'map',
  },
};

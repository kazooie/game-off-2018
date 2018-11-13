export enum CellType {
  GRASS = 0,
  SAND = 1,
  SNOW = 2,
  GROUND = 3,
}

export interface Cell {
  x: number;
  y: number;
  type: CellType;
}

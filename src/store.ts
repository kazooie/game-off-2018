import {Cell} from './types';

class Store {
  private level: number;
  private world: Cell[];

  constructor() {
    this.level = 1;
    this.world = [];
  }

  public getLevel = () => this.level;

  public setWorld = (cells: Cell[]) => {
    this.world = [...cells];
  };

  public getWorld = (): Cell[] => {
    return [...this.world];
  };
}

export const theStore = new Store();

export interface Player {
  balance?: Balance;
}

export type Balance = {
  valorantPoints: number;
  radianitePoints: number;
};

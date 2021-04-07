export type Credentials = {
  username: string;
  password: string;
};

export type Player = {
  balance?: PlayerBalance;
};

export type PlayerBalance = {
  valorantPoints: number;
  radianitePoints: number;
};

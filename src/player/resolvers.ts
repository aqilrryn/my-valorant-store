import Player from "./Player";

const resolvers = {
  Query: {
    player: (
      _: any,
      { username, password }: { username: string; password: string },
      __: any,
      ___: any
    ) => Player.getBalance(username, password),
  },
};

export default resolvers;

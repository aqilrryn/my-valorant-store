import Store from "./Store";

const resolvers = {
  Query: {
    store: (
      _: any,
      { username, password }: { username: string; password: string },
      __: any,
      ___: any
    ) => Store.playerStore(username, password),
  },
};

export default resolvers;

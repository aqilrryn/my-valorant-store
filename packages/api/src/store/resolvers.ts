import Store from "./Store";

const resolvers = {
  Query: {
    store: () => Store.playerStore(),
  },
};

export default resolvers;

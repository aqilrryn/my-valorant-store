import Skin from "./Skin";

const resolvers = {
  Query: {
    skins: () => Skin.all(),
  },
};

export default resolvers;

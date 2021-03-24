import Weapon from "./Weapon";

const resolvers = {
  Query: {
    weapons: () => Weapon.all(),
  },
};

export default resolvers;

import { gql } from "apollo-server";

const typeDef = gql`
  type Weapon {
    uuid: ID
    displayName: String
    displayIcon: String
    skins: [Skin]
  }

  type Skin {
    uuid: String
    displayName: String
    displayIcon: String
  }

  extend type Query {
    weapons: [Weapon]
  }
`;

export default typeDef;

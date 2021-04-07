import { gql } from "apollo-server";

const typeDef = gql`
  type Weapon {
    uuid: ID
    displayName: String
    displayIcon: String
    skins: [Skin]
  }

  extend type Query {
    weapons: [Weapon]
  }
`;

export default typeDef;

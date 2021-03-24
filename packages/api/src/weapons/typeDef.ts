import { gql } from "apollo-server";

const typeDef = gql`
  type Weapon {
    uuid: ID
    displayName: String
  }

  extend type Query {
    weapons: [Weapon]
  }
`;

export default typeDef;

import { gql } from "apollo-server-express";

const typeDef = gql`
  type Balance {
    valorantPoints: Int
    radianitePoints: Int
  }

  type Player {
    balance: Balance
  }

  extend type Query {
    player(username: String!, password: String!): Player
  }
`;

export default typeDef;

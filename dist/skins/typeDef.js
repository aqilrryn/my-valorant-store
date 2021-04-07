"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDef = apollo_server_express_1.gql `
  type Skin {
    uuid: String
    displayName: String
    displayIcon: String
    cost: Int
  }

  extend type Query {
    skins: [Skin]
  }
`;
exports.default = typeDef;
//# sourceMappingURL=typeDef.js.map
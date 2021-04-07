"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDef = apollo_server_express_1.gql `
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
exports.default = typeDef;
//# sourceMappingURL=typeDef.js.map
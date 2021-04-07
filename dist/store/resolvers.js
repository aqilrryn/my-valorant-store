"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = __importDefault(require("./Store"));
const resolvers = {
    Query: {
        store: (_, { username, password }, __, ___) => Store_1.default.playerStore(username, password),
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map
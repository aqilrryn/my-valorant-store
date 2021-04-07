"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Weapon_1 = __importDefault(require("./Weapon"));
const resolvers_1 = __importDefault(require("./resolvers"));
const typeDef_1 = __importDefault(require("./typeDef"));
exports.default = {
    Weapon: Weapon_1.default,
    resolvers: resolvers_1.default,
    typeDef: typeDef_1.default,
};
//# sourceMappingURL=index.js.map
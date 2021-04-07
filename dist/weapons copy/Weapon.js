"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class Weapon {
    static async all() {
        const { data } = await axios_1.default.get(`https://valorant-api.com/v1/weapons`);
        return data;
    }
}
exports.default = Weapon;
//# sourceMappingURL=Weapon.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Weapon_1 = __importDefault(require("../weapons/Weapon"));
class Skin {
    static async all() {
        const skins = (await Weapon_1.default.all()).flatMap((w) => w.skins);
        return skins;
    }
}
exports.default = Skin;
//# sourceMappingURL=Skin.js.map
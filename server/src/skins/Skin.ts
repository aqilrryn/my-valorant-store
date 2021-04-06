import Weapon from "../weapons/Weapon";
import { Skin as SkinType } from "./types";

abstract class Skin {
  static async all(): Promise<SkinType[]> {
    const skins = (await Weapon.all()).flatMap((w) => w.skins);
    return skins;
  }
}

export default Skin;

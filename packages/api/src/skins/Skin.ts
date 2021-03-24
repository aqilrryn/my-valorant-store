import Weapon from "../weapons/Weapon";
import { Skin as SkinType } from "./types";

abstract class Skin {
  static async all(): Promise<SkinType[]> {
    return (await Weapon.all()).flatMap((w) => w.skins);
  }
}

export default Skin;

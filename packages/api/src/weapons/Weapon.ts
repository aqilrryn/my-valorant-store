import axios from "axios";
import { Weapon as WeaponType } from "./types";

abstract class Weapon {
  static async all(): Promise<WeaponType[]> {
    const { data } = await axios.get(`https://valorant-api.com/v1/weapons`);
    return data;
  }
}

export default Weapon;

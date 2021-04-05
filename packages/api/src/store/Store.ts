import { Store as StoreType } from "./types";
import { getPlayerStore } from "../services/rsoService";
import Skin from "../skins/Skin";

abstract class Store {
  static async playerStore(
    username: string,
    password: string
  ): Promise<StoreType> {
    const store = await getPlayerStore(username, password);
    const skins = await Skin.all();

    return {
      skins: (store ?? []).map((s) => {
        const skin = skins.find((skin) => skin.displayName === s?.name);

        return {
          uuid: s?.id ?? "",
          cost: s?.cost,
          displayName: s?.name ?? "",
          displayIcon: skin?.displayIcon,
        };
      }),
    };
  }
}

export default Store;

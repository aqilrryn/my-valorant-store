import { Store as StoreType } from "./types";
import { getPlayerStore } from "../services/rsoService";
import Skin from "../skins/Skin";

abstract class Store {
  static async playerStore(): Promise<StoreType> {
    const store = await getPlayerStore();
    const skins = await Skin.all();

    return {
      skins: (store ?? []).map((s) => ({
        uuid: s?.id ?? "",
        displayName: s?.name ?? "",
        displayIcon: skins.find((skin) => skin.displayName === s?.name)
          ?.displayIcon,
      })),
    };
  }
}

export default Store;

import { Store as StoreType } from "./types";
import { getPlayerStore } from "../services/rsoService";

abstract class Store {
  static async playerStore(): Promise<StoreType> {
    const store = await getPlayerStore();

    return {
      skins: (store ?? []).map((s) => ({
        uuid: s?.id ?? "",
        displayName: s?.name ?? "",
      })),
    };
  }
}

export default Store;

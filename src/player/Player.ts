import { Player as PlayerType } from "./types";
import { getPlayerBalance } from "../services/rsoService";

abstract class Player {
  static async getBalance(
    username: string,
    password: string
  ): Promise<PlayerType> {
    const balance = await getPlayerBalance(username, password);
    return { balance };
  }
}

export default Player;

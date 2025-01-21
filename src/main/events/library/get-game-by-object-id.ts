import { registerEvent } from "../register-event";
import { downloadsSublevel, levelKeys } from "@main/level";
import { gamesSublevel } from "@main/level";
import type { GameShop } from "@types";

const getGameByObjectId = async (
  _event: Electron.IpcMainInvokeEvent,
  shop: GameShop,
  objectId: string
) => {
  const gameKey = levelKeys.game(shop, objectId);
  const [game, download] = await Promise.all([
    gamesSublevel.get(gameKey),
    downloadsSublevel.get(gameKey),
  ]);

  if (!game) return null;

  return { id: gameKey, ...game, download };
};

registerEvent("getGameByObjectId", getGameByObjectId);

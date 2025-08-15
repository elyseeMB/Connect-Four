import { PlayerColor } from "./enums/Color.ts";
import type { ContextProps, CustomsEvents } from "./types/types.ts";

export const guards = {
  /**
   * CanJoinGuard
   */
  canJoinGuard: ({
    context,
    event,
  }: {
    context: ContextProps;
    event: CustomsEvents;
  }) => {
    if (event.type !== "join") {
      return false;
    }
    if (!context.players || !Array.isArray(context.players)) {
      console.error("Players array not initialized ");
      return false;
    }
    return (
      context.players.length < 2 &&
      !context.players.find((p) => p.id === event.playerId)
    );
  },

  canLeaveGuard: ({
    context,
    event,
  }: {
    context: ContextProps;
    event: CustomsEvents;
  }) => {
    if (event.type !== "leave") {
      return false;
    }
    return !!context.players.find((p) => p.id === event.playerId);
  },

  canChooseColorGuard: ({
    context,
    event,
  }: {
    context: ContextProps;
    event: CustomsEvents;
  }) => {
    if (event.type !== "chooseColor") {
      return false;
    }
    return (
      [PlayerColor.RED, PlayerColor.YELLOW].includes(event.playerColor) &&
      context.players.find((p) => p.id === event.playerId) !== undefined &&
      context.players.find((p) => p.color === event.playerColor) === undefined
    );
  },

  canStartGameGuard: ({
    context,
    event,
  }: {
    context: ContextProps;
    event: CustomsEvents;
  }) => {
    if (event.type !== "start") {
      return false;
    }
    return context.players.filter((p) => p.color).length === 2;
  },
};

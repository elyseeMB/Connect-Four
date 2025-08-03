import type { ContextProps, CustomsEvents } from "./types/types.ts";

export const guards = {
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
};

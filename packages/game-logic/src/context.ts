import type { ContextProps, GridState, Init, Player } from "./types/types.ts";

export const initialContext: ContextProps = {
  players: [] as Player[],
  currentPlayer: null as null | Player["id"],
  rowLength: 4,
  grid: [
    ["E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E"],
    ["E", "E", "E", "E", "E", "E", "E"],
  ] as GridState,
};

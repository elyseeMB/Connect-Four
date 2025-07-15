import {
  type ContextFrom,
  type EventObject,
  type MachineContext,
  type MetaObject,
  type NonReducibleUnknown,
  type SetupTypes,
} from "xstate";
import { PlayerColor } from "../enums/Color.ts";
import type { initialContext } from "../context.ts";

export type GameMachineContext = {
  players: Player[];
};

export type Player = {
  id: string;
  name: string;
  color?: PlayerColor;
};

export type CellEmpty = "E";
export type CellState = PlayerColor.RED | PlayerColor.YELLOW | CellEmpty;
export type GridState = CellState[][];
export type GameContext = ContextFrom<typeof initialContext>;

export type JoinEvent = {
  type: "join";
  playerId: Player["id"];
  name: Player["name"];
};

export type LeaveEvent = {
  type: "leave";
  playerId: Player["id"];
};

export type ChooseColorEvent = {
  type: "chooseColor";
  playerId: Player["id"];
  playerColor: PlayerColor;
};

export type StartEvent = {
  type: "start";
  playerId: Player["id"];
};

export type DropTokentEvent = {
  type: "start";
  playerId: Player["id"];
  x: number;
};

export type CustomsEvents =
  | JoinEvent
  | LeaveEvent
  | ChooseColorEvent
  | StartEvent
  | DropTokentEvent
  | { type: "restart" };

export type ContextProps = {
  players: Player[];
  currentPlayer: null | Player["id"];
  rowLength: number;
  grid: GridState;
};

export type Init<TContext extends MachineContext> = SetupTypes<
  TContext,
  CustomsEvents,
  {},
  string,
  NonReducibleUnknown,
  NonReducibleUnknown,
  EventObject,
  MetaObject
>;

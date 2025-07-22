import type { createMachine } from "xstate";
import type {
  ChooseColorEvent,
  ContextProps,
  DropTokentEvent,
  JoinEvent,
  LeaveEvent,
  StartEvent,
} from "./types/types.ts";

export const joinGameAction = ({
  context,
  event,
}: {
  context: ContextProps;
  event: JoinEvent;
}): ContextProps => ({
  ...context,
  players: [...context.players, { id: event.playerId, name: event.name }],
});

export const leaveGameAction = ({
  context,
  event,
}: {
  context: ContextProps;
  event: LeaveEvent;
}): ContextProps => ({
  ...context,
  players: context.players.filter((player) => player.id !== event.playerId),
});

export const chooseColor = ({
  context,
  event,
}: {
  context: ContextProps;
  event: ChooseColorEvent;
}): ContextProps["players"] =>
  context.players.map((player) =>
    player.id === event.playerId
      ? { ...player, color: event.playerColor }
      : player
  );

export const start = ({
  context,
  event,
}: {
  context: ContextProps;
  event: StartEvent;
}): ContextProps["players"] =>
  context.players.filter((player) => player.id === event.playerId);

export const dropToken = ({
  context,
  event,
}: {
  context: ContextProps;
  event: DropTokentEvent;
}): ContextProps => ({
  currentPlayer: event.playerId,
  x: event.x,
});

export const restart = ({
  context,
  event,
}: {
  context: ContextProps;
  event: DropTokentEvent;
}) => ({});

import type { GuardPredicate } from "xstate/guards";
import type { ContextProps, JoinEvent } from "./types/types.ts";
import type { ParameterizedObject } from "xstate";

export const canJoinGuard: GuardPredicate<
  ContextProps,
  JoinEvent,
  CustomEvent,
  ParameterizedObject
> = ({ context, event }) => {
  return (
    context.players.length < 2 &&
    context.players.find((p) => p.id === event.playerId) === undefined
  );
};

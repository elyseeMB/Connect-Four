import {
  assign,
  createActor,
  setup,
  type EventObject,
  type MachineConfig,
  type ParameterizedObject,
} from "xstate";

import { initialContext } from "../context.ts";
import { GameStates } from "../enums/GameState.ts";
import type { ContextProps, CustomsEvents, JoinEvent } from "../types/types.ts";
import {
  chooseColor,
  dropToken,
  joinGameAction,
  leaveGameAction,
  restart,
  start,
} from "../actions.ts";

const feedbackMachine = setup({
  types: {
    events: {} as CustomsEvents,
    context: initialContext,
  },
  guards: {
    canJoinGuard: (_, params: { context: ContextProps; event: JoinEvent }) => {
      return (
        params.context.players.length < 2 &&
        params.context.players.find((p) => p.id === params.event.playerId) ===
          undefined
      );
    },
  },
}).createMachine({
  id: "game",
  initial: GameStates.LOBBY,
  states: {
    [GameStates.LOBBY]: {
      on: {
        join: {
          guard: {
            type: "canJoinGuard",
            params: ({ context, event }) => ({
              context,
              event,
            }),
          },
          actions: [assign(joinGameAction)],
          target: GameStates.LOBBY,
        },
        leave: {
          actions: [assign(leaveGameAction)],
          target: GameStates.LOBBY,
        },
        chooseColor: {
          actions: assign({
            players: chooseColor,
          }),
          target: GameStates.LOBBY,
        },
        start: {
          actions: assign({
            players: start,
          }),
          target: GameStates.PLAY,
        },
      },
    },
    [GameStates.PLAY]: {
      on: {
        dropToken: {
          actions: assign({
            players: dropToken,
          }),
          target: GameStates.VICTORY,
        },
      },
    },
    [GameStates.VICTORY]: {
      on: {
        restart: {
          actions: assign({
            players: restart,
          }),
          target: GameStates.LOBBY,
        },
      },
    },
    [GameStates.DRAW]: {
      on: {
        restart: {
          target: GameStates.LOBBY,
        },
      },
    },
  },
});

const feedbackActor = createActor(feedbackMachine).start();

feedbackActor.send({
  type: "join",
  playerId: "2",
  name: "je suis le name",
});

feedbackActor.subscribe((state) => {
  console.log("Nouvel état", state.value);
});

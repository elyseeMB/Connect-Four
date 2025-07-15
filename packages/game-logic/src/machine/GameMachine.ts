import {
  assign,
  createActor,
  createMachine,
  setup,
  type EventObject,
  type MachineConfig,
} from "xstate";
import { initialContext } from "../context.ts";
import { GameStates } from "../enums/GameState.ts";
import type { ContextProps, CustomsEvents } from "../types/types.ts";
import {
  chooseColor,
  dropToken,
  join,
  leave,
  restart,
  start,
} from "../functions.ts";

const feedbackMachine = setup({
  types: {
    events: {} as CustomsEvents,
    context: initialContext,
  },
}).createMachine({
  id: "game",
  context: initialContext!,
  initial: GameStates.LOBBY,
  states: {
    [GameStates.LOBBY]: {
      on: {
        join: {
          actions: assign({
            players: join,
          }),

          target: GameStates.LOBBY,
        },
        leave: {
          actions: assign({
            players: leave,
          }),
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
          target: "???",
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

const feedbackActor = createActor(feedbackMachine);

feedbackActor.send({
  type: "join",
  playerId: "2",
  name: "je suis le name",
});

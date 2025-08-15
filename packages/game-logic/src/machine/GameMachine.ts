import { assign, createActor, setup } from "xstate";

import { initialContext } from "../context.ts";
import { GameStates } from "../enums/GameState.ts";
import { initialSetupType } from "../types/types.ts";
import {
  chooseColor,
  dropToken,
  joinGameAction,
  leaveGameAction,
  restart,
  start,
} from "../actions.ts";
import { guards } from "../guards.ts";

export const feedbackMachine = setup({
  types: initialSetupType,
  guards,
}).createMachine({
  id: "game",
  context: initialContext,
  initial: GameStates.LOBBY,
  states: {
    [GameStates.LOBBY]: {
      on: {
        join: {
          guard: "canJoinGuard",
          actions: [assign(joinGameAction)],
          target: GameStates.LOBBY,
        },
        leave: {
          guard: "canLeaveGuard",
          actions: [assign(leaveGameAction)],
          target: GameStates.LOBBY,
        },
        chooseColor: {
          guard: "canChooseColorGuard",
          actions: assign({
            players: chooseColor,
          }),
          target: GameStates.LOBBY,
        },
        start: {
          guard: "canStartGameGuard",
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

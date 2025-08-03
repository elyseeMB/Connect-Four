import { beforeEach, describe, expect, it } from "vitest";
import { feedbackMachine } from "../../src/machine/GameMachine.ts";
import { guards } from "../../src/guards.ts";
import { Actor, createActor } from "xstate";
import { ContextProps, CustomsEvents } from "../../src/types/types.ts";

describe("machine/guards", () => {
  describe("canJoinGame", () => {
    let machine: Actor<typeof feedbackMachine>;
    beforeEach(() => {
      machine = createActor(feedbackMachine).start();
    });

    it("should test guard function directly", () => {
      const mockContext: ContextProps = {
        players: [],
        currentPlayer: null,
        rowLength: 4,
        grid: Array(7).fill(Array(7).fill("E")),
      };

      const mockEvent: CustomsEvents = {
        type: "join",
        playerId: "1",
        name: "john",
      };

      const result = guards.canJoinGuard({
        context: mockContext,
        event: mockEvent,
      });

      expect(result).toBe(true);
    });

    it("should reject when game is full", () => {
      const result = guards.canJoinGuard({
        context: {
          players: [
            { id: "1", name: "john" },
            { id: "2", name: "jane" },
          ],
          currentPlayer: null,
          rowLength: 4,
          grid: Array(7).fill(Array(7).fill("E")),
        },
        event: {
          type: "join",
          playerId: "3",
          name: "david",
        },
      });

      expect(result).toBe(false);
    });

    it("should let a player join", () => {
      const snapshot = machine.getSnapshot();

      const canJoin = snapshot.can({
        type: "join",
        playerId: "1",
        name: "john",
      });

      expect(canJoin).toBe(true);
    });
  });
});

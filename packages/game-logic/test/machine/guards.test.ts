import { beforeEach, describe, expect, it } from "vitest";
import { feedbackMachine } from "../../src/machine/GameMachine.ts";
import { guards } from "../../src/guards.ts";
import { Actor, createActor } from "xstate";
import { ContextProps, CustomsEvents } from "../../src/types/types.ts";
import { PlayerColor } from "../../src/enums/Color.ts";

describe("machine/guards", () => {
  /**
   * CanJoinGame
   */
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

  /**
   * CanLeaveGame
   */
  describe("canLeaveGame", () => {
    let machine: Actor<typeof feedbackMachine>;
    beforeEach(() => {
      machine = createActor(feedbackMachine).start();
    });

    it("should test guard function directly", () => {
      const mockContext: ContextProps = {
        players: [
          { id: "1", name: "john" },
          { id: "2", name: "jane" },
        ],
        currentPlayer: null,
        rowLength: 4,
        grid: Array(7).fill(Array(7).fill("E")),
      };

      const mockEvent: CustomsEvents = {
        type: "leave",
        playerId: "1",
      };

      const result = guards.canLeaveGuard({
        context: mockContext,
        event: mockEvent,
      });

      expect(result).toBe(true);
    });
  });

  /**
   * CanLeaveGame
   */
  describe("canChooseColorGame", () => {
    let machine: Actor<typeof feedbackMachine>;
    beforeEach(() => {
      machine = createActor(feedbackMachine).start();
    });

    it("should return false when player tries to choose an already taken color", () => {
      const mockContext: ContextProps = {
        players: [
          { id: "1", name: "john", color: PlayerColor.RED },
          { id: "2", name: "jane", color: PlayerColor.YELLOW },
        ],
        currentPlayer: null,
        rowLength: 4,
        grid: Array(7).fill(Array(7).fill("E")),
      };

      const mockEvent: CustomsEvents = {
        type: "chooseColor",
        playerId: "1",
        playerColor: PlayerColor.RED,
      };

      const result = guards.canChooseColorGuard({
        context: mockContext,
        event: mockEvent,
      });

      expect(result).toBe(false);
    });

    it("should allow player to choose an available color", () => {
      const mockContext: ContextProps = {
        players: [
          { id: "1", name: "john" },
          { id: "2", name: "jane", color: PlayerColor.YELLOW },
        ],
        currentPlayer: null,
        rowLength: 4,
        grid: Array(7).fill(Array(7).fill("E")),
      };

      const mockEvent: CustomsEvents = {
        type: "chooseColor",
        playerId: "1",
        playerColor: PlayerColor.RED,
      };

      const result = guards.canChooseColorGuard({
        context: mockContext,
        event: mockEvent,
      });

      expect(result).toBe(true);
    });
  });

  /**
   * CanStartGame
   */
  describe("canStartGame", () => {
    let machine: Actor<typeof feedbackMachine>;
    beforeEach(() => {
      machine = createActor(feedbackMachine).start();
    });

    it("should return false when not enough players have colors", () => {
      const mockContext: ContextProps = {
        players: [
          { id: "1", name: "john" },
          { id: "2", name: "jane", color: PlayerColor.YELLOW },
        ],
        currentPlayer: null,
        rowLength: 4,
        grid: Array(7).fill(Array(7).fill("E")),
      };

      const mockEvent: CustomsEvents = {
        type: "start",
      };

      const result = guards.canStartGameGuard({
        context: mockContext,
        event: mockEvent,
      });

      expect(result).toBe(false);
    });

    it("should allow player to start the game", () => {
      const mockContext: ContextProps = {
        players: [
          { id: "1", name: "john", color: PlayerColor.RED },
          { id: "2", name: "jane", color: PlayerColor.YELLOW },
        ],
        currentPlayer: null,
        rowLength: 4,
        grid: Array(7).fill(Array(7).fill("E")),
      };

      const mockEvent: CustomsEvents = {
        type: "start",
        playerId: "1",
      };

      const result = guards.canStartGameGuard({
        context: mockContext,
        event: mockEvent,
      });

      expect(result).toBe(true);
    });

    it("should return false when too many players", () => {
      const mockContext: ContextProps = {
        players: [
          { id: "1", name: "john", color: PlayerColor.RED },
          { id: "2", name: "jane", color: PlayerColor.YELLOW },
          { id: "3", name: "bob", color: PlayerColor.YELLOW },
        ],
        currentPlayer: null,
        rowLength: 4,
        grid: Array(7).fill(Array(7).fill("E")),
      };

      const mockEvent: CustomsEvents = {
        type: "start",
      };

      const result = guards.canStartGameGuard({
        context: mockContext,
        event: mockEvent,
      });

      expect(result).toBe(false);
    });
  });
});

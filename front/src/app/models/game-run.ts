import { GameState } from './game-state';

export interface GameRun {
  questionsHash: number;
  state: GameState;
  currentQuestion?: number;
  answers: Map<number, string | string[]>;
}

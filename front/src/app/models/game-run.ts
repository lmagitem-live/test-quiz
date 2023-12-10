import { GameState } from './game-state';
import { Score } from './score';

export interface GameRun {
  questionsHash: number;
  state: GameState;
  currentQuestion?: number;
  answers: Map<number, string | string[]>;
  score?: Score;
}

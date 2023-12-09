import { Answer } from './answer';
import { GameState } from './game-state';

export interface GameRun {
  questionsHash: number;
  state: GameState;
  answers: Answer[];
}

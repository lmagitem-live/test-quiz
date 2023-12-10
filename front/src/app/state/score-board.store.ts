import { Injectable, computed, signal } from '@angular/core';

import { GameRun } from '../models/game-run';
import { Score } from '../models/score';
import { AnswerVerificationUtils } from '../utils/answer-verification.utils';

import { QuestionStore } from './question.store';

@Injectable({ providedIn: 'root' })
export class ScoreBoardStore {
  private previousRunsMutable = signal<GameRun[]>([]);

  public previousRuns = this.previousRunsMutable.asReadonly();

  public highScore = computed<Score | undefined>(() =>
    this.previousRuns().length > 0
      ? this.previousRuns().reduce((prev, curr) =>
          AnswerVerificationUtils.isHigherScore(curr.score, prev.score)
            ? curr
            : prev
        ).score
      : undefined
  );

  public initPreviousRuns(runs: GameRun[]): void {
    this.previousRunsMutable.set(runs);
  }

  public archiveCurrentRun(run: GameRun): void {
    this.previousRunsMutable.update((runs) => [...runs, run]);
    this.questionStore.setQuestions({ hash: -1, questions: [] });
  }

  constructor(private questionStore: QuestionStore) {}
}

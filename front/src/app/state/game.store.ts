import { Injectable, computed, signal } from '@angular/core';

import { GameRun } from '../models/game-run';
import { GameState } from '../models/game-state';
import { QuestionSet } from '../models/question-set';

@Injectable({
  providedIn: 'root',
})
export class GameStore {
  private previousRunsMutable = signal<GameRun[]>([]);

  private currentRunMutable = signal<GameRun>({
    questionsHash: -1,
    state: 'toLaunch',
    answers: [],
  });

  private questionsMutable = signal<QuestionSet>({ hash: -1, questions: [] });

  public previousRuns = this.previousRunsMutable.asReadonly();

  public currentRun = this.currentRunMutable.asReadonly();

  public questions = this.questionsMutable.asReadonly();

  public currentHash = computed<number>(() => this.currentRun().questionsHash);

  public currentQuestionId = computed<number | undefined>(
    () =>
      this.questions().questions.filter(
        (q) => !this.currentRun().answers.find((a) => q.id === a.questionId)
      )[0]?.id
  );

  public currentGameState = computed<GameState>(() => this.currentRun().state);

  public setCurrentQuestions(questionSet: QuestionSet): void {
    this.questionsMutable.set(questionSet);

    const previousRun = this.currentRun();
    if (previousRun.state === 'done' && previousRun.answers.length > 0) {
      this.previousRunsMutable.update((runs) => [...runs, previousRun]);
    }

    this.currentRunMutable.set({
      questionsHash: questionSet.hash,
      state: 'toLaunch',
      answers: [],
    });
  }
}

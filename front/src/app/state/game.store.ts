import { Injectable, computed, signal } from '@angular/core';

import { GameRun } from '../models/game-run';
import { GameState } from '../models/game-state';
import { Question } from '../models/question';
import { QuestionSet } from '../models/question-set';
import { AnswerVerificationUtils } from '../utils/answer-verification.utils';

@Injectable({ providedIn: 'root' })
export class GameStore {
  private previousRunsMutable = signal<GameRun[]>([]);

  private currentRunMutable = signal<GameRun>({
    questionsHash: -1,
    state: 'toLaunch',
    answers: new Map(),
  });

  private questionSetMutable = signal<QuestionSet>({ hash: -1, questions: [] });

  public previousRuns = this.previousRunsMutable.asReadonly();

  public currentRun = this.currentRunMutable.asReadonly();

  public questionSets = this.questionSetMutable.asReadonly();

  public currentHash = computed<number>(() => this.currentRun().questionsHash);

  public currentQuestionId = computed<number | undefined>(
    () => this.currentRun().currentQuestion
  );

  public currentQuestion = computed<Question | undefined>(() =>
    this.questionSets().questions.find((q) => q.id === this.currentQuestionId())
  );

  public currentAnswer = computed<string | string[] | undefined>(() =>
    this.currentRun().answers.get(this.currentQuestionId() ?? 0)
  );

  public currentGameState = computed<GameState>(() => this.currentRun().state);

  public numberOfQuestions = computed<number>(
    () => this.questionSets().questions.length
  );

  public questionsAnswered = computed<{ question: string; success: boolean }[]>(
    () =>
      this.questionSets().questions.map((q) => ({
        question: q.label,
        success: AnswerVerificationUtils.isAnswerValid(
          q,
          this.currentRun().answers.get(q.id)
        ),
      }))
  );

  public setQuestions(questionSet: QuestionSet): void {
    this.questionSetMutable.set(questionSet);

    const previousRun = this.currentRun();
    if (previousRun.state === 'done' && previousRun.answers.size > 0) {
      this.previousRunsMutable.update((runs) => [...runs, previousRun]);
    }
  }

  public setCurrentQuestion(id: number): void {
    this.currentRunMutable.update((run) => ({ ...run, currentQuestion: id }));
  }

  public setCurrentAnswer(answer: string | string[]): void {
    this.currentRunMutable.update((run) => {
      const questionId = this.currentQuestionId() ?? 0;
      run.answers.set(questionId, answer);
      return run;
    });
  }

  public setRunStatus(state: GameState): void {
    this.currentRunMutable.update((run) => ({
      ...run,
      currentQuestion: state !== 'done' ? run.currentQuestion : undefined,
      state,
    }));
  }

  public initCurrentRun(): void {
    this.currentRunMutable.set({
      questionsHash: this.questionSets().hash,
      state: 'toLaunch',
      currentQuestion: 1,
      answers: new Map(),
    });
  }
}

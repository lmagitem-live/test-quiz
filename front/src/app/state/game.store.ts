import { Injectable, computed, signal } from '@angular/core';

import { GameRun } from '../models/game-run';
import { GameState } from '../models/game-state';
import { Question } from '../models/question';
import { Score } from '../models/score';
import { AnswerVerificationUtils } from '../utils/answer-verification.utils';

import { QuestionStore } from './question.store';

@Injectable({ providedIn: 'root' })
export class GameStore {
  private currentRunMutable = signal<GameRun>({
    questionsHash: -1,
    state: 'toLaunch',
    answers: new Map(),
  });

  public currentRun = this.currentRunMutable.asReadonly();

  public currentHash = computed<number>(() => this.currentRun().questionsHash);

  public currentQuestion = computed<Question | undefined>(() =>
    this.questionStore
      .questionSets()
      .questions.find((q) => q.id === this.currentQuestionId())
  );

  public currentQuestionId = computed<number | undefined>(
    () => this.currentRun().currentQuestion
  );

  public currentAnswer = computed<string | string[] | undefined>(() =>
    this.currentRun().answers.get(this.currentQuestionId() ?? 0)
  );

  public questionsAnswered = computed<{ question: string; success: boolean }[]>(
    () =>
      this.questionStore.questionSets().questions.map((q) => ({
        question: q.label,
        success: AnswerVerificationUtils.isAnswerValid(
          q,
          this.currentRun().answers.get(q.id)
        ),
      }))
  );

  public currentGameState = computed<GameState>(() => this.currentRun().state);

  public currentScore = computed<Score | undefined>(
    () => this.currentRun().score
  );

  public setCurrentQuestion(id: number): void {
    this.currentRunMutable.update((run) => ({ ...run, currentQuestion: id }));
  }

  public setCurrentAnswer(answer: string | string[]): void {
    this.currentRunMutable.update((run) => {
      const questionId = this.currentQuestionId() ?? 0;
      run.answers.set(questionId, answer);
      return { ...run };
    });
  }

  public setRunStatus(state: GameState): void {
    this.currentRunMutable.update((run) => ({
      ...run,
      currentQuestion: state !== 'done' ? run.currentQuestion : undefined,
      state,
    }));
  }

  public setRunScore(): void {
    this.currentRunMutable.update((run) => ({
      ...run,
      score: {
        validAnswers: this.questionsAnswered().reduce(
          (prev, curr) => prev + (curr.success ? 1 : 0),
          0
        ),
        questions: this.questionStore.numberOfQuestions(),
      },
    }));
  }

  public initCurrentRun(): void {
    this.currentRunMutable.set({
      questionsHash: this.questionStore.questionSets().hash,
      state: 'toLaunch',
      currentQuestion: 1,
      answers: new Map(),
    });
  }

  constructor(private questionStore: QuestionStore) {}
}

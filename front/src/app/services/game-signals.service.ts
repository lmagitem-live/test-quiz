import { Injectable, Signal } from '@angular/core';

import { AnsweredQuestion } from '../models/answered-question';
import { GameState } from '../models/game-state';
import { Question } from '../models/question';
import { Score } from '../models/score';
import { GameStore } from '../state/game.store';
import { QuestionStore } from '../state/question.store';
import { ScoreBoardStore } from '../state/score-board.store';

@Injectable({ providedIn: 'root' })
export class GameSignalsService {
  constructor(
    private store: GameStore,
    private questionStore: QuestionStore,
    private scoreBoardStore: ScoreBoardStore
  ) {}

  public getCurrentHash(): Signal<number> {
    return this.store.currentHash;
  }

  public getCurrentQuestionId(): Signal<number | undefined> {
    return this.store.currentQuestionId;
  }

  public getCurrentQuestion(): Signal<Question | undefined> {
    return this.store.currentQuestion;
  }

  public getCurrentAnswer(): Signal<string | string[] | undefined> {
    return this.store.currentAnswer;
  }

  public getCurrentScore(): Signal<Score | undefined> {
    return this.store.currentScore;
  }

  public getHighScore(): Signal<Score | undefined> {
    return this.scoreBoardStore.highScore;
  }

  public getCurrentGameState(): Signal<GameState> {
    return this.store.currentGameState;
  }

  public getNumberOfQuestions(): Signal<number> {
    return this.questionStore.numberOfQuestions;
  }

  public getQuestionsAnswered(): Signal<AnsweredQuestion[]> {
    return this.store.questionsAnswered;
  }

  public setCurrentAnswer(answer: string | string[]): void {
    this.store.setCurrentAnswer(answer);
  }
}

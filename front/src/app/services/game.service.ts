import { Injectable, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { GameState } from '../models/game-state';
import { Question } from '../models/question';
import { QuestionSet } from '../models/question-set';
import { GameStore } from '../state/game.store';
import { HashUtils } from '../utils/hash.utils';

import { RestService } from './rest.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(
    private restService: RestService,
    private store: GameStore,
    private router: Router
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

  public getCurrentGameState(): Signal<GameState> {
    return this.store.currentGameState;
  }

  public getNumberOfQuestions(): Signal<number> {
    return this.store.numberOfQuestions;
  }

  public getQuestionsAnswered(): Signal<
    { question: string; success: boolean }[]
  > {
    return this.store.questionsAnswered;
  }

  public setCurrentAnswer(answer: string | string[]): void {
    this.store.setCurrentAnswer(answer);
  }

  public confirmAnswer(): void {
    const currentAnswer = this.getCurrentAnswer()();
    if (currentAnswer) {
      const currentQuestionId = this.getCurrentQuestionId()();
      const nextAvailableQuestionId = this.store
        .questionSets()
        .questions.find((q) => q.id === (currentQuestionId ?? 0) + 1)?.id;

      if (nextAvailableQuestionId) {
        this.store.setCurrentQuestion(nextAvailableQuestionId);

        const run = this.store.currentRun();
        this.router.navigate([
          '/game',
          run.questionsHash,
          'question',
          nextAvailableQuestionId,
        ]);
      } else {
        this.gameOver();
      }
    }
  }

  public startGame(): void {
    this.store.setRunStatus('launched');
    const run = this.store.currentRun();
    this.router.navigate(['/game', run.questionsHash, 'question', 0]);
  }

  public gameOver(): void {
    console.log('Game Over');
    const run = this.store.currentRun();
    this.store.setRunStatus('done');
    this.router.navigate(['/game', run.questionsHash, 'results']);
  }

  public async loadQuestions(): Promise<void> {
    const questions = await firstValueFrom(this.restService.getQuestions());
    questions.forEach((question: Question, i: number) => (question.id = i + 1));
    const questionSet: QuestionSet = {
      hash: HashUtils.hashCode(JSON.stringify(questions)),
      questions,
    };
    this.store.setQuestions(questionSet);
    this.store.initCurrentRun();
  }
}

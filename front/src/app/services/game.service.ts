import { Injectable, Signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { GameState } from '../models/game-state';
import { Question } from '../models/question';
import { QuestionSet } from '../models/question-set';
import { GameStore } from '../state/game.store';
import { HashUtils } from '../utils/hash.utils';

import { RestService } from './rest.service';

@Injectable()
export class GameService {
  constructor(
    private restService: RestService,
    private store: GameStore
  ) {}

  public getCurrentHash(): Signal<number> {
    return this.store.currentHash;
  }

  public getCurrentQuestionId(): Signal<number | undefined> {
    return this.store.currentQuestionId;
  }

  public getCurrentGameState(): Signal<GameState> {
    return this.store.currentGameState;
  }

  public areQuestionsLoaded(): Signal<number> {
    return this.store.numberOfQuestions;
  }

  public async loadQuestions(): Promise<void> {
    const questions = await firstValueFrom(this.restService.getQuestions());
    questions.forEach((question: Question, i: number) => (question.id = i));
    const questionSet: QuestionSet = {
      hash: HashUtils.hashCode(JSON.stringify(questions)),
      questions,
    };
    this.store.setCurrentQuestions(questionSet);
  }
}

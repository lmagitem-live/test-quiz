import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { GameRun } from '../models/game-run';
import { Question } from '../models/question';
import { QuestionSet } from '../models/question-set';
import { GameStore } from '../state/game.store';
import { QuestionStore } from '../state/question.store';
import { ScoreBoardStore } from '../state/score-board.store';
import { HashUtils } from '../utils/hash.utils';

import { LocalStorageService } from './local-storage.service';
import { RestService } from './rest.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(
    private storageService: LocalStorageService,
    private restService: RestService,
    private store: GameStore,
    private questionStore: QuestionStore,
    private scoreBoardStore: ScoreBoardStore,
    private router: Router
  ) {}

  public startGame(): void {
    this.store.setRunStatus('launched');
    const run = this.store.currentRun();
    this.router.navigate(['/game', run.questionsHash, 'question', 0]);
  }

  public gameOver(): void {
    this.store.setRunScore();
    this.store.setRunStatus('done');

    const run = this.store.currentRun();
    this.router.navigate(['/game', run.questionsHash, 'results']);
  }

  public restart(): void {
    this.router.navigate(['/home']);
  }

  public archiveRun(): void {
    this.scoreBoardStore.archiveCurrentRun(this.store.currentRun());
    this.storageService.saveData(
      'previousRuns',
      this.scoreBoardStore.previousRuns()
    );
  }

  public loadBestScores(): void {
    const previousRuns =
      this.storageService.getData<GameRun[] | undefined>('previousRuns') ?? [];
    this.scoreBoardStore.initPreviousRuns(previousRuns);
  }

  public async loadQuestions(): Promise<void> {
    const questions = await firstValueFrom(this.restService.getQuestions());

    questions.forEach((question: Question, i: number) => (question.id = i + 1));
    const questionSet: QuestionSet = {
      hash: HashUtils.hashCode(JSON.stringify(questions)),
      questions,
    };

    this.questionStore.setQuestions(questionSet);
    this.store.initCurrentRun();
  }

  public confirmAnswer(): void {
    const currentAnswer = this.store.currentAnswer();
    if (currentAnswer) {
      const currentQuestionId = this.store.currentQuestionId();
      const nextAvailableQuestionId = this.questionStore
        .questionSets()
        .questions.find((q) => q.id === (currentQuestionId ?? 0) + 1)?.id;

      if (nextAvailableQuestionId) {
        this.askNextQuestion(nextAvailableQuestionId);
      } else {
        this.gameOver();
      }
    }
  }

  private askNextQuestion(nextAvailableQuestionId: number): void {
    this.store.setCurrentQuestion(nextAvailableQuestionId);
    this.router.navigate([
      '/game',
      this.store.currentRun().questionsHash,
      'question',
      nextAvailableQuestionId,
    ]);
  }
}

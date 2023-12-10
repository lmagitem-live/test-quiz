import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

import { PadNumberPipe } from '../../pipes/pad-number.pipe';
import { GameSignalsService } from '../../services/game-signals.service';
import { GameService } from '../../services/game.service';
import { AnswerVerificationUtils } from '../../utils/answer-verification.utils';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MessageModule, ButtonModule, HeaderComponent, PadNumberPipe],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements AfterViewInit {
  public score = this.handler.getCurrentScore()();

  public highScore = computed(() => {
    const previousHighScore = this.handler.getHighScore()();
    const score = this.handler.getCurrentScore()();
    if (
      !previousHighScore ||
      AnswerVerificationUtils.isHigherScore(score, previousHighScore)
    ) {
      return this.handler.getCurrentScore()();
    }
    return this.handler.getHighScore()();
  })();

  public newHighScore = computed(
    () =>
      !this.handler.getHighScore()() ||
      AnswerVerificationUtils.isHigherScore(
        this.handler.getCurrentScore()(),
        this.handler.getHighScore()()
      )
  )();

  public padScore = `${this.score?.questions ?? 1}`.length;

  public padHighScore = `${this.highScore?.questions ?? 1}`.length;

  public questionsAnswered = this.handler.getQuestionsAnswered()();

  constructor(
    private service: GameService,
    private handler: GameSignalsService
  ) {}

  public ngAfterViewInit(): void {
    this.service.archiveRun();
  }

  public restart() {
    this.service.restart();
  }
}

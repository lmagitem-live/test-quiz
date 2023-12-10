import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SubSink } from 'subsink';

import { GameService } from '../../services/game.service';
import { AnswerInputComponent } from '../answer-input/answer-input.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  imports: [ButtonModule, HeaderComponent, AnswerInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements AfterViewInit, OnDestroy {
  public currentQuestionId = this.gameService.getCurrentQuestionId();

  public numberOfQuestions = this.gameService.getNumberOfQuestions();

  public currentQuestion = this.gameService.getCurrentQuestion();

  public timer = signal<number>(120);

  public show = false;

  private subs = new SubSink();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private debounceTimeout?: any;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    this.decrementTimer();
    this.initShowDebouncer();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onAnswerChange(answer: string | string[]): void {
    this.gameService.setCurrentAnswer(answer);
  }

  public confirmAnswer(): void {
    this.gameService.confirmAnswer();
  }

  private decrementTimer(): void {
    setTimeout(() => {
      if (this.timer() > 0) {
        this.timer.update((t) => t - 1);
        this.decrementTimer();
      } else {
        this.gameService.gameOver();
      }
    }, 1000);
  }

  /** Whenever the route changes (either because the game just loaded or we skip to another question),
   *  we'll launch a timer after which the show variable updates. Used to reset the state of PrimeNg's
   *  components when they stay the same on question changes. */
  private initShowDebouncer(): void {
    this.subs.sink = this.route.params.subscribe(() => {
      this.show = false;

      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      this.debounceTimeout = setTimeout(() => {
        this.show = true;
        this.changeDetector.markForCheck();
      }, 100);
    });
  }
}

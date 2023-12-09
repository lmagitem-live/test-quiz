import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

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
export class GameComponent implements AfterViewInit {
  public currentQuestionId = this.gameService.getCurrentQuestionId();

  public numberOfQuestions = this.gameService.getNumberOfQuestions();

  public currentQuestion = this.gameService.getCurrentQuestion();

  public timer = signal<number>(120);

  constructor(private gameService: GameService) {}

  public ngAfterViewInit(): void {
    this.decrementTimer();
  }

  public confirmAnswer(): void {}

  private gameOver(): void {}

  private decrementTimer(): void {
    setTimeout(() => {
      if (this.timer() > 0) {
        this.timer.update((t) => t - 1);
        this.decrementTimer();
      } else {
        this.gameOver();
      }
    }, 1000);
  }
}

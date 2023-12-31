import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { GameSignalsService } from '../../services/game-signals.service';
import { GameService } from '../../services/game.service';
import { ScoreInsertComponent } from '../score-insert/score-insert.component';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    RouterModule,
    ButtonModule,
    ProgressSpinnerModule,
    ScoreInsertComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public numberOfQuestions = this.handler.getNumberOfQuestions();

  constructor(
    private service: GameService,
    private handler: GameSignalsService
  ) {}

  public ngOnInit(): void {
    setTimeout(() => this.service.loadQuestions(), 1500);
  }

  public getQuestionsLabel(): string {
    const n = this.numberOfQuestions();
    return `${n} question${n > 1 ? 's' : ''}`;
  }

  public startQuiz(): void {
    if (this.numberOfQuestions() > 0) {
      this.service.startGame();
    }
  }
}

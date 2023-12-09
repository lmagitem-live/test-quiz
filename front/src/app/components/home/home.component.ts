import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
})
export class HomeComponent implements OnInit {
  public numberOfQuestions = this.gameService.areQuestionsLoaded();

  constructor(private gameService: GameService) {}

  public ngOnInit(): void {
    setTimeout(() => this.gameService.loadQuestions(), 1500);
  }

  public getQuestionsLabel(): string {
    const n = this.numberOfQuestions();
    return `${n} question${n > 1 ? 's' : ''}`;
  }
}

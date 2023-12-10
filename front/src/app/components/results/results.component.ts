import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessageModule } from 'primeng/message';

import { GameService } from '../../services/game.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MessageModule, HeaderComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {
  public questionsAnswered = this.gameService.getQuestionsAnswered();

  constructor(private gameService: GameService) {}
}

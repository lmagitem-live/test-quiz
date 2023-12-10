import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

import { PadNumberPipe } from '../../pipes/pad-number.pipe';
import { GameSignalsService } from '../../services/game-signals.service';

@Component({
  selector: 'app-score-insert',
  standalone: true,
  imports: [PadNumberPipe],
  templateUrl: './score-insert.component.html',
  styleUrl: './score-insert.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreInsertComponent {
  public highScore = this.handler.getHighScore();

  public padHighScore = computed(
    () => `${this.highScore()?.questions ?? 1}`.length
  );

  constructor(private handler: GameSignalsService) {}
}

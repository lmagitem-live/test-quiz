import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-score-insert',
  standalone: true,
  imports: [],
  templateUrl: './score-insert.component.html',
  styleUrl: './score-insert.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreInsertComponent {}

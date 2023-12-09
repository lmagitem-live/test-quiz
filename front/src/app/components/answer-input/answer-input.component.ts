import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-answer-input',
  standalone: true,
  imports: [],
  templateUrl: './answer-input.component.html',
  styleUrl: './answer-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerInputComponent {}

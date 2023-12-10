import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';

import { Question } from '../../models/question';

@Component({
  selector: 'app-answer-input',
  standalone: true,
  imports: [FormsModule, RadioButtonModule, CheckboxModule, InputTextModule],
  templateUrl: './answer-input.component.html',
  styleUrl: './answer-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerInputComponent {
  @Input()
  public set question(question: Signal<Question | undefined>) {
    this.currentQuestion = question;
    this.currentValue = null;
  }

  public get question(): Signal<Question | undefined> | undefined {
    return this.currentQuestion;
  }

  @Output()
  public answer: EventEmitter<string | string[]> = new EventEmitter();

  public set value(value: string | string[] | null) {
    this.currentValue = value;
    this.answer.emit(value ?? '');
  }

  public get value(): string | string[] | null {
    return this.currentValue;
  }

  private currentQuestion?: Signal<Question | undefined>;

  private currentValue: string | string[] | null = null;
}

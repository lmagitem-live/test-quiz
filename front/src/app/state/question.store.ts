import { Injectable, computed, signal } from '@angular/core';

import { QuestionSet } from '../models/question-set';

@Injectable({ providedIn: 'root' })
export class QuestionStore {
  private questionSetMutable = signal<QuestionSet>({ hash: -1, questions: [] });

  public questionSets = this.questionSetMutable.asReadonly();

  public numberOfQuestions = computed<number>(
    () => this.questionSets().questions.length
  );

  public setQuestions(questionSet: QuestionSet): void {
    this.questionSetMutable.set(questionSet);
  }
}

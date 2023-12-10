import { TestBed } from '@angular/core/testing';

import { QuestionStore } from './question.store';

describe('QuestionStore', () => {
  let state: QuestionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    state = TestBed.inject(QuestionStore);
  });

  it('should be created', () => {
    expect(state).toBeTruthy();
  });
});

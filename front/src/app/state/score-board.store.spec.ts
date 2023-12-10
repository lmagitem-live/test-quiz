import { TestBed } from '@angular/core/testing';

import { ScoreBoardStore } from './score-board.store';

describe('ScoreBoardStore', () => {
  let state: ScoreBoardStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    state = TestBed.inject(ScoreBoardStore);
  });

  it('should be created', () => {
    expect(state).toBeTruthy();
  });
});

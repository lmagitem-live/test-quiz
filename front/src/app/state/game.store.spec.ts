import { TestBed } from '@angular/core/testing';

import { GameStore } from './game.store';

describe('GameStore', () => {
  let state: GameStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    state = TestBed.inject(GameStore);
  });

  it('should be created', () => {
    expect(state).toBeTruthy();
  });
});

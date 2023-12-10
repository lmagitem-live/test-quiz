import { TestBed } from '@angular/core/testing';

import { GameSignalsService } from './game-signals.service';

describe('GameSignalsService', () => {
  let service: GameSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

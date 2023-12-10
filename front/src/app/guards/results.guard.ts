import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { GameSignalsService } from '../services/game-signals.service';

export const resultsGuard: CanActivateFn = (route) => {
  const handler = inject(GameSignalsService);
  const router = inject(Router);

  const currentHash = handler.getCurrentHash()();
  const currentQuestionId = handler.getCurrentQuestionId()();
  const hash = route.params['hash'];

  if (hash != currentHash) {
    router.navigate(['/home']);
    return false;
  }
  if (currentQuestionId != undefined) {
    router.navigate(['/game', currentHash, 'question', currentQuestionId]);
    return false;
  }

  return true;
};

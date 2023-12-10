import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { GameSignalsService } from '../services/game-signals.service';

export const questionGuard: CanActivateFn = (route) => {
  const handler = inject(GameSignalsService);
  const router = inject(Router);

  const currentHash = handler.getCurrentHash()();
  const currentQuestionId = handler.getCurrentQuestionId()();
  const hash = route.params['hash'];
  const questionId = route.params['id'];

  if (hash != currentHash) {
    router.navigate(['/home']);
    return false;
  }
  if (questionId != currentQuestionId) {
    router.navigate(['/game', currentHash, 'question', currentQuestionId]);
    return false;
  }

  return currentQuestionId !== undefined;
};

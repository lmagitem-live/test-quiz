import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { GameService } from '../services/game.service';

export const resultsGuard: CanActivateFn = (route) => {
  const gameService = inject(GameService);
  const router = inject(Router);

  const currentHash = gameService.getCurrentHash()();
  const currentQuestionId = gameService.getCurrentQuestionId()();
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

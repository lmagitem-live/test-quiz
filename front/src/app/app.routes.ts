import { Routes } from '@angular/router';

import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/home/home.component';
import { ResultsComponent } from './components/results/results.component';
import { resultsGuard } from './guards/game.guard';
import { questionGuard } from './guards/question.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'game/:hash/question/:id',
    component: GameComponent,
    canActivate: [questionGuard],
  },
  {
    path: 'game/:hash/results',
    component: ResultsComponent,
    canActivate: [resultsGuard],
  },
];

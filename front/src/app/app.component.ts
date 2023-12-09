import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GameService } from './services/game.service';
import { RestService } from './services/rest.service';
import { GameStore } from './state/game.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  providers: [GameStore, GameService, RestService],
  templateUrl: './app.component.html',
})
export class AppComponent {}

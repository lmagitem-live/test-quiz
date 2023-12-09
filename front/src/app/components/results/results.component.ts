import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PadNumberPipe } from '../../pipes/pad-number.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [PadNumberPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input()
  public showQuestion: boolean = false;

  @Input()
  public currentQuestion: number = 0;

  @Input()
  public maxQuestion: number = 0;

  @Input()
  public showTimer: boolean = false;

  @Input()
  public secondsLeft: number = 0;
}

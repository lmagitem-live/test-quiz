import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreInsertComponent } from './score-insert.component';

describe('ScoreInsertComponent', () => {
  let component: ScoreInsertComponent;
  let fixture: ComponentFixture<ScoreInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreInsertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

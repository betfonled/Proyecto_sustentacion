import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogProcessComponent } from './log-process.component';

describe('LogProcessComponent', () => {
  let component: LogProcessComponent;
  let fixture: ComponentFixture<LogProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogProcessComponent]
    });
    fixture = TestBed.createComponent(LogProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

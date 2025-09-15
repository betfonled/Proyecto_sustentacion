import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMinutesComponent } from './create-minutes.component';

describe('CreateMinutesComponent', () => {
  let component: CreateMinutesComponent;
  let fixture: ComponentFixture<CreateMinutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMinutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMinutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadInformationComponent } from './load-information.component';

describe('LoadInformationComponent', () => {
  let component: LoadInformationComponent;
  let fixture: ComponentFixture<LoadInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadInformationComponent]
    });
    fixture = TestBed.createComponent(LoadInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

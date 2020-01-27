import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourInputComponent } from './tour-input.component';

describe('TourInputComponent', () => {
  let component: TourInputComponent;
  let fixture: ComponentFixture<TourInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByAccountantComponent } from './order-by-accountant.component';

describe('OrderByAccountantComponent', () => {
  let component: OrderByAccountantComponent;
  let fixture: ComponentFixture<OrderByAccountantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderByAccountantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderByAccountantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

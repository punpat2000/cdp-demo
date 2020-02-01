import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersBySalesComponent } from './orders-by-sales.component';

describe('OrdersComponent', () => {
  let component: OrdersBySalesComponent;
  let fixture: ComponentFixture<OrdersBySalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersBySalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersBySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

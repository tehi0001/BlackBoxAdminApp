import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingCostComponent } from './add-shipping-cost.component';

describe('AddShippingCostComponent', () => {
  let component: AddShippingCostComponent;
  let fixture: ComponentFixture<AddShippingCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShippingCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShippingCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

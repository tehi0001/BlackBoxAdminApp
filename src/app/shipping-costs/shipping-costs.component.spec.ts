import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCostsComponent } from './shipping-costs.component';

describe('ShippingCostsComponent', () => {
  let component: ShippingCostsComponent;
  let fixture: ComponentFixture<ShippingCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingCostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

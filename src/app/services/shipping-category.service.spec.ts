import { TestBed } from '@angular/core/testing';

import { ShippingCategoryService } from './shipping-category.service';

describe('ShippingCategoryService', () => {
  let service: ShippingCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

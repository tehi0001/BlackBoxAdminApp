import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPropertyComponent } from './add-product-property.component';

describe('AddProductPropertyComponent', () => {
  let component: AddProductPropertyComponent;
  let fixture: ComponentFixture<AddProductPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

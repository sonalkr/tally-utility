import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockSaleComponent } from './create-stock-sale.component';

describe('CreateStockSaleComponent', () => {
  let component: CreateStockSaleComponent;
  let fixture: ComponentFixture<CreateStockSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStockSaleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStockSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

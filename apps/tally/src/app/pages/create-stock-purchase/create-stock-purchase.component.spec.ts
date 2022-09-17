import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockPurchaseComponent } from './create-stock-purchase.component';

describe('CreateStockPurchaseComponent', () => {
  let component: CreateStockPurchaseComponent;
  let fixture: ComponentFixture<CreateStockPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStockPurchaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStockPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

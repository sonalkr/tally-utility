import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTrayComponent } from './app-tray.component';

describe('AppTrayComponent', () => {
  let component: AppTrayComponent;
  let fixture: ComponentFixture<AppTrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppTrayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

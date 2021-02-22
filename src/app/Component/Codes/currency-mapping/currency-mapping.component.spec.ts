import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyMappingComponent } from './currency-mapping.component';

describe('CurrencyMappingComponent', () => {
  let component: CurrencyMappingComponent;
  let fixture: ComponentFixture<CurrencyMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

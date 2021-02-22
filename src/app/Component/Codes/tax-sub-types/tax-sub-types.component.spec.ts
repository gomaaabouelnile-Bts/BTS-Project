import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSubTypesComponent } from './tax-sub-types.component';

describe('TaxSubTypesComponent', () => {
  let component: TaxSubTypesComponent;
  let fixture: ComponentFixture<TaxSubTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxSubTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxSubTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

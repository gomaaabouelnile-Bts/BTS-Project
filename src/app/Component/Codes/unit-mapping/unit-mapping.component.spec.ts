import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitMappingComponent } from './unit-mapping.component';

describe('UnitMappingComponent', () => {
  let component: UnitMappingComponent;
  let fixture: ComponentFixture<UnitMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

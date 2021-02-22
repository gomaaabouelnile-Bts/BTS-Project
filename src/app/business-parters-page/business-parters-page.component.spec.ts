import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartersPageComponent } from './business-parters-page.component';

describe('BusinessPartersPageComponent', () => {
  let component: BusinessPartersPageComponent;
  let fixture: ComponentFixture<BusinessPartersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPartersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

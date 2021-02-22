import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCodesComponent } from './activity-codes.component';

describe('ActivityCodesComponent', () => {
  let component: ActivityCodesComponent;
  let fixture: ComponentFixture<ActivityCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

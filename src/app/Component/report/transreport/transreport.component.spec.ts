import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransreportComponent } from './transreport.component';

describe('TransreportComponent', () => {
  let component: TransreportComponent;
  let fixture: ComponentFixture<TransreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

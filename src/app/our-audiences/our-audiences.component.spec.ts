import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurAudiencesComponent } from './our-audiences.component';

describe('OurAudiencesComponent', () => {
  let component: OurAudiencesComponent;
  let fixture: ComponentFixture<OurAudiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurAudiencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurAudiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

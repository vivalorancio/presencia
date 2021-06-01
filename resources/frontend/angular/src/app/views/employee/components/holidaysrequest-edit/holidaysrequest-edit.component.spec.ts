import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysrequestEditComponent } from './holidaysrequest-edit.component';

describe('HolidaysrequestEditComponent', () => {
  let component: HolidaysrequestEditComponent;
  let fixture: ComponentFixture<HolidaysrequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysrequestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysrequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

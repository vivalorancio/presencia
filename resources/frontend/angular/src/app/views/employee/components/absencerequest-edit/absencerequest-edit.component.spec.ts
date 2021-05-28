import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencerequestEditComponent } from './absencerequest-edit.component';

describe('AbsencerequestEditComponent', () => {
  let component: AbsencerequestEditComponent;
  let fixture: ComponentFixture<AbsencerequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsencerequestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsencerequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

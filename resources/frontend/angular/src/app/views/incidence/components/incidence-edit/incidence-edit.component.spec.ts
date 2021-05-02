import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceEditComponent } from './incidence-edit.component';

describe('IncidenceEditComponent', () => {
  let component: IncidenceEditComponent;
  let fixture: ComponentFixture<IncidenceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

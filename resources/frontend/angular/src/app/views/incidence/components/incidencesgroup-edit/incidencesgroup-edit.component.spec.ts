import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidencesgroupEditComponent } from './incidencesgroup-edit.component';

describe('IncidencesgroupEditComponent', () => {
  let component: IncidencesgroupEditComponent;
  let fixture: ComponentFixture<IncidencesgroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidencesgroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidencesgroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

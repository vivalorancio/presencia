import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidencesgroupincidenceListComponent } from './incidencesgroupincidence-list.component';

describe('IncidencesgroupincidenceListComponent', () => {
  let component: IncidencesgroupincidenceListComponent;
  let fixture: ComponentFixture<IncidencesgroupincidenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidencesgroupincidenceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidencesgroupincidenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

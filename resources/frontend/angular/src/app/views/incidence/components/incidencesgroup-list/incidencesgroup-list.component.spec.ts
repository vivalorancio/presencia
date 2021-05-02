import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidencesgroupListComponent } from './incidencesgroup-list.component';

describe('IncidencesgroupListComponent', () => {
  let component: IncidencesgroupListComponent;
  let fixture: ComponentFixture<IncidencesgroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidencesgroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidencesgroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

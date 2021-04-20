import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftDropdownComponent } from './shift-dropdown.component';

describe('ShiftDropdownComponent', () => {
  let component: ShiftDropdownComponent;
  let fixture: ComponentFixture<ShiftDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

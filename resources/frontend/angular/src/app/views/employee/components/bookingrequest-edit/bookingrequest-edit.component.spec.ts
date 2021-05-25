import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingrequestEditComponent } from './bookingrequest-edit.component';

describe('BookingrequestEditComponent', () => {
  let component: BookingrequestEditComponent;
  let fixture: ComponentFixture<BookingrequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingrequestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingrequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

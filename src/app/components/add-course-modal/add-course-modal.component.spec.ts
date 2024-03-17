import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseModalComponent } from './add-course-modal.component';

describe('AddCourseModalComponent', () => {
  let component: AddCourseModalComponent;
  let fixture: ComponentFixture<AddCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourseModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Course } from '../../../models/interfaces/Course';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-course-modal',
  standalone: true,
  imports: [FormsModule, NgClass, ReactiveFormsModule],
  templateUrl: './edit-course-modal.component.html',
  styleUrl: './edit-course-modal.component.css',
})
export class EditCourseModalComponent {
  @Input() showModal!: boolean;
  @Input() course!: Course;
  @Output() closeModalEvent = new EventEmitter();
  @Output() coursesEditted = new EventEmitter<Course>();

  courseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      code: ['', [Validators.required, this.codeValidator]],
      score: ['', [Validators.required,this.numberTypeValidator,this.scoreRangeValidator,]],
      unit: ['', [Validators.required, this.numberTypeValidator]],
    });
  }

  ngOnChanges(): void {
    if (this.course) {
      // Update form controls with initial values when course input changes
      this.courseForm.patchValue({
        name: this.course.name,
        code: this.course.code,
        score: this.course.score,
        unit: this.course.unit,
      });
    }
  }

  closeModal(event: Event): void {
    event.stopPropagation();
    this.showModal = false;
    this.closeModalEvent.emit();
  }

  saveCourse(event: Event) {
    if (this.courseForm.valid) {
      this.course.name = this.courseForm.value.name;
      this.course.code = this.courseForm.value.code;
      this.course.score = this.courseForm.value.score;
      this.course.unit = this.courseForm.value.unit;

      this.coursesEditted.emit(this.course);
      this.closeModal(event);
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscKeydownHandler(event: KeyboardEvent) {
    if (this.showModal) {
      this.closeModal(event);
    }
  }

  //validators
  nameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(value)) {
      return { nameError: 'course name must contain only alphabets' };
    }
    return null;
  }

  codeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return {
        codeError: 'can contain only numbers, alphabets, hyphen, or underscore',
      };
    }
    return null;
  }

  scoreRangeValidator(control: AbstractControl): ValidationErrors | null {
    const score = control.value;
    if (score < 0 || score > 100) {
      return {
        rangeError: 'score must be between 0 and 100',
      };
    }
    return null;
  }

  numberTypeValidator(control: AbstractControl): ValidationErrors | null {
    const number = control.value;
    if (typeof number !== 'number') {
      return {
        typeError: 'must be between a number',
      };
    }
    return null;
  }
}

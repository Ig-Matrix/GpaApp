import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Course } from '../../models/interfaces/Course';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-course-modal',
  standalone: true,
  imports: [FormsModule, NgClass, ReactiveFormsModule],
  templateUrl: './add-course-modal.component.html',
  styleUrl: './add-course-modal.component.css',
})
export class AddCourseModalComponent {
  @Input() showModal!: boolean;
  @Output() closeModalEvent = new EventEmitter();
  @Output() coursesAdded = new EventEmitter<Course>();

  courseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, this.nameValidator]),
    code: new FormControl('', [Validators.required, this.codeValidator]),
    score: new FormControl('', [Validators.required, this.scoreRangeValidator, this.numberTypeValidator]),
    unit: new FormControl('', [Validators.required, this.numberTypeValidator]),
  });

  closeModal(event: Event): void {
    event.stopPropagation();
    this.showModal = false;
    this.closeModalEvent.emit();
  }

  submitCourse(event: Event) {
    this.coursesAdded.emit(this.courseForm.value);
    this.closeModal(event);
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
        codeError:
          'can contain only numbers, alphabets, hyphen, or underscore',
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

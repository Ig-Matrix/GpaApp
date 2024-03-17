import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../models/interfaces/Course';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-course-modal',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './edit-course-modal.component.html',
  styleUrl: './edit-course-modal.component.css'
})
export class EditCourseModalComponent {
  @Input() showModal!: boolean;
  @Output() closeModalEvent = new EventEmitter();
  @Output() coursesEditted = new EventEmitter<Course>();

  course: Course = { name: '', code: '', score: 0, unit: 0 };

  closeModal(event: Event): void {
    event.stopPropagation();
    this.showModal = false;
    this.course = { name: '', code: '', score: 0, unit: 0 };
    this.closeModalEvent.emit();
  }

  submitCourse(event: Event) {
    this.coursesEditted.emit(this.course);
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
}

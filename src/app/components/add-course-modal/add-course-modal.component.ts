import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Course } from '../../models/interfaces/Course';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-course-modal',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './add-course-modal.component.html',
  styleUrl: './add-course-modal.component.css',
})
export class AddCourseModalComponent {
  @Input() showModal!: boolean;
  @Output() closeModalEvent = new EventEmitter();
  @Output() coursesAdded = new EventEmitter<Course>();

  course: Course = { name: '', code: '', score: 0, unit: 0 };

  closeModal(event: Event): void {
    event.stopPropagation();
    this.showModal = false;
    this.course = { name: '', code: '', score: 0, unit: 0 };
    this.closeModalEvent.emit();
  }

  submitCourse(event: Event) {
    this.coursesAdded.emit(this.course);
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

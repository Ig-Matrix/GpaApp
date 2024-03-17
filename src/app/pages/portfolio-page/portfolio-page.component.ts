import { Component } from '@angular/core';
import { NavComponent } from '../../components/portfolio/nav/nav.component';
import { AddCourseModalComponent } from '../../components/add-course-modal/add-course-modal.component';
import { Course } from '../../models/interfaces/Course';
import { NgClass } from '@angular/common';
import { ProgressComponent } from '../../components/progress/progress.component';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [NavComponent, AddCourseModalComponent, NgClass, ProgressComponent],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.css',
})
export class PortfolioPageComponent {
  courses: Course[] = [];
  isShowModal: boolean = false;
  cgpa!: number;
  isGpaCalculated: boolean=false

  openModal() {
    this.isShowModal = true;
  }

  closeModal() {
    this.isShowModal = false;
  }

  addCourse(course: Course) {
    course.grade = this.calculateGrade(course.score);
    this.courses.push(course);
    this.isShowModal = false;
    this.cgpa = 0;
    this.isGpaCalculated=false;
  }

  calculateGrade(score: number): string {
    if (score >= 70) {
      return 'A';
    } else if (score >= 60) {
      return 'B';
    } else if (score >= 50) {
      return 'C';
    } else if (score >= 45) {
      return 'D';
    } else if (score >= 40) {
      return 'E';
    } else {
      return 'F';
    }
  }

  calculateGpa(): number {
    this.isGpaCalculated=true;
    let totalCreditUnits = 0;
    let totalQualityPoints = 0;

    for (const course of this.courses) {
      const gradeUnit = this.getGradePoints(course.score);
      totalCreditUnits += course.unit;
      totalQualityPoints += gradeUnit * course.unit;
    }

    if (totalCreditUnits <= 0) {
      this.cgpa = 0;
    } else {
      this.cgpa = totalQualityPoints / totalCreditUnits;
    }
    return this.cgpa;
  }

  deleteCourse(course: Course) {
    const deleteIndex = this.courses.findIndex((c) => c === course);
    if (deleteIndex !== -1) {
      this.courses.splice(deleteIndex, 1);
      this.cgpa = 0;
      this.isGpaCalculated=false
    }
  }

  getGradePoints(score: number): number {
    if (score >= 70) {
      return 5.0;
    } else if (score >= 60) {
      return 4.0;
    } else if (score >= 50) {
      return 3.0;
    } else if (score >= 45) {
      return 2.0;
    } else if (score >= 40) {
      return 1.0;
    } else if (score >= 1) {
      return (score / 39) * 0.99;
    } else {
      return 0; // Return null for scores below 1
    }
  }
}

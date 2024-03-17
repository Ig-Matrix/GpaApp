import { Component } from '@angular/core';
import { NavComponent } from '../../components/portfolio/nav/nav.component';
import { AddCourseModalComponent } from '../../components/add-course-modal/add-course-modal.component';
import { Course } from '../../models/interfaces/Course';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [NavComponent, AddCourseModalComponent, NgClass],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.css',
})
export class PortfolioPageComponent {
  courses: Course[]=[]
  isShowModal: boolean = false;

  openModal() {
    this.isShowModal = true;    
  }

  closeModal(){
    this.isShowModal=false;
  }

  addCourse(course: Course){
    course.grade= this.calculateGrade(course.score)
    this.courses.push(course)
    this.isShowModal=false
  }

  calculateGrade(score: number): string{
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
}

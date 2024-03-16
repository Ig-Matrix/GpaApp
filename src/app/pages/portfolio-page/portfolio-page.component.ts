import { Component } from '@angular/core';
import { NavComponent } from '../../components/portfolio/nav/nav.component';
import { AddCourseModalComponent } from '../../components/add-course-modal/add-course-modal.component';
import { Course } from '../../models/interfaces/Course';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [NavComponent, AddCourseModalComponent],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.css',
})
export class PortfolioPageComponent {
  isShowModal: boolean = false;

  openModal() {
    this.isShowModal = true;    
  }

  closeModal(){
    this.isShowModal=false;
  }

  addCourse(course: Course){
    console.log(course);
    this.isShowModal=false
  }
}

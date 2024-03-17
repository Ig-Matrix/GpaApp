import { Component, Input } from '@angular/core';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [RoundProgressModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})
export class ProgressComponent {
  @Input() cgpa: number = 0;

  getColorByCGPA(cgpa: number): string {
    if (cgpa >= 4.5 && cgpa <= 5.0) {
      return 'rgba(79, 70, 229, 1)'; // Indigo 500
    } else if (cgpa >= 4.0 && cgpa < 4.5) {
      return 'rgba(59, 130, 246, 1)'; // Blue 500 
    } else if (cgpa >= 3.0 && cgpa < 4.0) {
      return 'rgba(66, 185, 131, 1)'; // Green 500
    } else if (cgpa >= 2.0 && cgpa < 3.0) {
      return 'rgba(253, 126, 20, 1)'; // Orange 500
    } else if (cgpa >= 1.0 && cgpa < 2.0) {
      return 'rgba(251, 191, 36, 1)'; // Yellow 500
    } else {
      return 'rgba(239, 68, 68, 1)'; // Red 500
    }
  }
  
}

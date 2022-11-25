import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  constructor(private router: Router) {}

  trainingCategories: String[];

  ngOnInit() {
    this.trainingCategories = [
      'Omni',
      'Strength',
      'Power',
      'Endurance',
      'Mobility',
      'Neuromotor',
      'Cardiorespiratory',
      'Bench Press',
      'Middle Split',
      'Gymmastics Fundamentals',
      'Sleep',
      'Nutrition',
    ];
  }

  openVideos(index) {
    // this.assessmentService.setCurrentCategory(category);
    // this.assessmentService.setCurrentAssessment(assessment);
    // this.assessmentService.setCurrentScores(this.getScores(assessment));
    // alert('openVideos ' + this.trainingCategories[index]);
    let navigationExtras: NavigationExtras = {
      state: { title: this.trainingCategories[index] },
    };
    this.router.navigate(['/home', 'training', 'videos'], navigationExtras);
  }
}

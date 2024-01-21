import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {Capacitor} from '@capacitor/core';
import {StatusBar, Style} from '@capacitor/status-bar';
import {AlertController, isPlatform} from '@ionic/angular';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  constructor(private router: Router, private alertController: AlertController) {}

  buttonList = [
    {label: 'Workout Log', class: 'blue-button'},
    {label: 'Goals', class: 'green-button'}
  ];
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

  ionViewWillEnter() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (Capacitor.isNativePlatform()) {
      // if (isPlatform('mobile')) {
      StatusBar.setStyle({style: Style.Dark});
      // if (prefersDark.matches) {
      //   StatusBar.setStyle({style: Style.Dark});
      // } else {
      //   StatusBar.setStyle({style: Style.Light});
      // }
    }
  }

  async commingSoon(feature: string) {
    const alert = await this.alertController.create({
      header: feature,
      message: 'Coming Soon',
      // subHeader: 'Important message',
      buttons: ['OK'],
    });

    await alert.present();
  }

  openVideos(index) {
    // this.assessmentService.setCurrentCategory(category);
    // this.assessmentService.setCurrentAssessment(assessment);
    // this.assessmentService.setCurrentScores(this.getScores(assessment));
    // alert('openVideos ' + this.trainingCategories[index]);
    let navigationExtras: NavigationExtras = {
      state: {title: this.trainingCategories[index]},
    };
    this.router.navigate(['/home', 'training', 'videos'], navigationExtras);
  }
}

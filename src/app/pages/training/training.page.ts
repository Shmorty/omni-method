import {CommonModule} from '@angular/common';
import {AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {Capacitor} from '@capacitor/core';
import {StatusBar, Style} from '@capacitor/status-bar';
import {AlertController, IonicModule, isPlatform} from '@ionic/angular';
import {SwiperOptions} from 'swiper/types';

@Component({
  standalone: true,
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrainingPage implements OnInit, AfterViewInit {
  @ViewChild('trainingSwiper', {read: ElementRef, static: false}) trainingSwiper?: ElementRef;
  public trainingSlidesOptions: SwiperOptions = {
    slidesPerView: 1.2,
    navigation: true,
    slidesOffsetBefore: 5,
    spaceBetween: 10,
    slidesOffsetAfter: 5,
  };

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

  ngAfterViewInit(): void {}

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

import {Component, OnInit} from '@angular/core';
import {AssessmentService} from './services/assessments/assessment.service';
import {ModalController, Platform} from '@ionic/angular';
import {EditProfilePage} from './pages/edit-profile/edit-profile.page';

// import { GoogleSigninService } from './google-signin.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Omni Method';

  // constructor(private readonly google: GoogleSigninService) {}
  // constructor(private store: Store<AppState>) {}

  constructor(
    private assessmentService: AssessmentService,
    private modalCtrl: ModalController,
    public platform: Platform
  ) {
    console.log('assessmentService.load()');
    assessmentService.load();
    this.initializeApp();
  }

  ngOnInit(): void {}

  initializeApp() {}

  async openEditProfile(e, user) {
    e.stopPropagation();
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: {
        user: user,
      },
      cssClass: 'edit-user-modal',
      presentingElement: document.querySelector('ion-router-outlet'),
      canDismiss: true,
    });
    await modal.present();
    modal.onDidDismiss().then(() => {
      // this.loadUserData();
    });
  }

}

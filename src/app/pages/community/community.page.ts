import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonModal, ModalController, isPlatform} from '@ionic/angular';
import {User} from '../../store/user/user.model';
import {OverlayEventDetail} from '@ionic/core/components';
import {RankingDetailPage} from '../ranking-detail/ranking-detail.page';
import {Observable} from 'rxjs';
import {StatusBar, Style} from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';
import {CommunityService} from '../../services/community/community.service';
import {Router} from '@angular/router';

export enum View {
  Rankings = 'Rankings',
  Updates = 'Updates',
  People = 'People',
}

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {
  public type: string = 'rankings';
  // View = View;
  public view: View = View.Rankings;
  public ranking$: Observable<User[]>;
  @ViewChild(IonModal) modal: IonModal;
  curUserId: string;
  name: string;
  message: string;

  constructor(
    private communityService: CommunityService,
    private modalCtrl: ModalController,
    private router: Router,
  ) {

    // loadAllUsers
    communityService.loadAllUsers();
  }

  ngOnInit() {
    // getAllUsersByScore
    this.ranking$ = this.communityService.getAllUsersByScore();
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

  highlightUser(athlete: User) {
    // return athlete.id == this.curUserId ? "highlight" : "";
    return athlete.id == this.curUserId ? "tertiary" : "";
  }

  // setView(viewName: View) {
  //   this.view = viewName;
  // }

  // segmentChange(event) {
  //   console.log("segmentChange", event);
  // }

  openDetails(athlete: User) {
    // load selected user
    this.communityService.loadSelectedUser(athlete.id);
    // go to detail page
    this.router.navigate(['/home/community/athlete']);
  }

  async showDetail(athlete: User) {
    console.log("showDetail athlete", athlete);
    const modal = await this.modalCtrl.create({
      component: RankingDetailPage,
      componentProps: {athlete: athlete},
      // breakpoints: [0, 0.97],
      // initialBreakpoint: 0.97
    });
    modal.present();
    // const {data, role} = await modal.onWillDismiss();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


}

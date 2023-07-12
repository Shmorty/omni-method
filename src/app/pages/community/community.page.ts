import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonModal, ModalController} from '@ionic/angular';
import {AuthService} from 'src/app/services/auth.service';
import {UserService} from 'src/app/services/user/user.service';
import {User} from 'src/app/store/user/user.model';
import {OverlayEventDetail} from '@ionic/core/components';
import {RankingDetailPage} from '../ranking-detail/ranking-detail.page';
import {Observable} from 'rxjs';

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
  View = View;
  public view: View = View.Rankings;
  public ranking$: Observable<User[]>;
  @ViewChild(IonModal) modal: IonModal;
  curUserId: string;
  name: string;
  message: string;

  constructor(private auth: AuthService, private userService: UserService,
    private modalCtrl: ModalController) {
    this.userService.getUser().subscribe((usr) => {
      this.curUserId = usr.id;
      this.ranking$ = this.userService.getUserRankings();
    });
  }

  ngOnInit() {}

  highlightUser(athlete: User) {
    // return athlete.id == this.curUserId ? "highlight" : "";
    // return athlete.id == this.curUserId ? "tertiary" : "";
    return athlete.id == this.curUserId ? "light" : "";
  }

  setView(viewName: View) {
    this.view = viewName;
  }

  logout() {
    this.auth.logout();
  }

  // interface SegmentChangeEventDetail {
  //   value?: string;
  // }
  segmentChange(event) {
    console.log("segmentChange", event);
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

import {Component, OnInit, ViewChild, inject} from '@angular/core';
// import {IonModal} from '@ionic/angular';
import {User} from '../../store/user/user.model';
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
  // @ViewChild(IonModal) modal: IonModal;
  private curUserId: string;

  constructor(
    private communityService: CommunityService,
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
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({style: Style.Dark});
    }
  }

  highlightUser(athlete: User) {
    // return athlete.id == this.curUserId ? "highlight" : "";
    return athlete.id == this.curUserId ? "tertiary" : "";
  }

  openDetails(athlete: User) {
    // load selected user
    this.communityService.loadSelectedUser(athlete.id);
    // go to detail page
    this.router.navigate(['/home/community/athlete']);
  }

}

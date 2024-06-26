import {Component, OnInit, ViewChild, inject} from '@angular/core';
// import {IonModal} from '@ionic/angular';
import {User} from '../../store/user/user.model';
import {Observable} from 'rxjs';
import {StatusBar, Style} from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';
import {CommunityService} from '../../services/community/community.service';
import {Router} from '@angular/router';
import {getBytes, getDownloadURL, getStorage, ref} from '@angular/fire/storage';

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
  public announcements = {
    "videos": [
      {
        "title": "Error loading content",
        "filename": undefined
      }
    ]
  };

  constructor(
    private communityService: CommunityService,
    private router: Router,
  ) {
    // loadAllUsers
    communityService.loadAllUsers();
  }

  async ngOnInit() {
    // getAllUsersByScore
    this.ranking$ = this.communityService.getAllUsersByScore();
    await this.readAnnouncementsFile();
    console.log("ngOnInit", JSON.stringify(this.announcements));
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

  userLevel(athlete: User): number {
    return Math.trunc(athlete.omniScore / 100);
  }

  async readAnnouncementsFile() {
    const filePath = "content/videos/announcements/announcements.json";
    const storage = getStorage();

    const fileRef = ref(storage, filePath);
    console.log("fileRef fullPath", fileRef.fullPath);
    console.log("fileRef name", fileRef.name);
    getBytes(fileRef).then((arrBuf) => {
      console.log("arrBuf", arrBuf);
    }).catch((err) => {
      console.log("getBytes err", err);
      return undefined;
    });
    // getDownloadURL(fileRef).then((url) => {
    //   console.log("announcements file URL", url);
    //   fetch(url).then((response) => {
    //     response.json().then((json) => {
    //       console.log("file json", json);
    //       this.announcements = json;
    //     });
    //   });
    // }).catch((err) => {
    //   console.log("readAnnouncements err", err);
    //   return undefined;
    // });
  }

}
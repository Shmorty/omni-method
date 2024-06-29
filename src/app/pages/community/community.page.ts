import {Component, OnInit, ViewChild, inject} from '@angular/core';
// import {IonModal} from '@ionic/angular';
import {User} from '../../store/user/user.model';
import {Observable} from 'rxjs';
import {StatusBar, Style} from '@capacitor/status-bar';
import {Capacitor, CapacitorHttp, HttpOptions, HttpResponse} from '@capacitor/core';
import {CommunityService} from '../../services/community/community.service';
import {Router} from '@angular/router';
import {getBytes, getDownloadURL, getStorage, ref} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../../services/storage/storage.service';

// export enum View {
//   Rankings = 'Rankings',
//   Announcements = 'Announcements',
//   People = 'People',
// }

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {
  public type: string = 'rankings';
  // public view: View = View.Rankings;
  public ranking$: Observable<User[]>;
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
    private storageService: StorageService,
  ) {
    // loadAllUsers
    communityService.loadAllUsers();
  }

  async ngOnInit() {
    // getAllUsersByScore
    this.ranking$ = this.communityService.getAllUsersByScore();

    // await this.readAnnouncementsFile();
    const announcements = await this.storageService.getAnnouncements();
    console.log("announcements", announcements);
    this.announcements = announcements;

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
    const filePath = "/content/videos/announcements/announcements.json";

    // this.http.get(filePath).subscribe((resp) => {
    //   console.log("get file", resp);
    // });

    const storage = getStorage();

    const fileRef = ref(storage, filePath);
    console.log("fileRef fullPath", fileRef.fullPath);
    console.log("fileRef name", fileRef.name);

    // getBytes(fileRef).then((arrBuf) => {
    //   console.log("arrBuf", arrBuf);
    // }).catch((err) => {
    //   console.log("getBytes err", err);
    //   return undefined;
    // });
    getDownloadURL(fileRef).then(async (url) => {
      console.log("announcements file URL", url);
      // this.http.get(url).subscribe((resp) => {
      //   console.log("get resp", resp);
      // });
      /*
      const options: HttpOptions = {
        url: url,
        method: "GET",
        responseType: "json",
        readTimeout: 2000,
        connectTimeout: 2000,
        webFetchExtra: {
          mode: "no-cors"
        }
      };
      // const response: HttpResponse = await CapacitorHttp.get(options).then((resp) => {
      await CapacitorHttp.get(options).then((resp) => {
        console.log("response.status", resp.status);
        console.log("response.data", resp.data);
        console.log("response.url", resp.url);
        console.log("response.headers", resp.headers);
      });
      */
      // fetch(url).then((response) => {
      //   response.json().then((json) => {
      //     console.log("file json", json);
      //     this.announcements = json;
      //   });
      // });
    }).catch((err) => {
      console.log("readAnnouncements err", err);
      return undefined;
    });
  }

  getVideoLink(filename: string) {
    const filePath = "/content/videos/announcements/" + filename;
    return this.storageService.getVideoUrl(filePath);
  }

}
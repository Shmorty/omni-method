import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
import {AlertController, IonRouterOutlet, ModalController, NavController, isPlatform} from '@ionic/angular';
import {Score} from '../../store/models/score.model';
import {AssessmentService} from '../../services/assessments/assessment.service';
import {Assessment, Category} from '../../store/assessments/assessment.model';
import {NewScorePage} from '../new-score/new-score.page';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user/user.service';
import {User} from 'src/app/store/user/user.model';
import {StatusBar, Style} from '@capacitor/status-bar';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: './assessment-detail.page.html',
  styleUrls: ['./assessment-detail.page.scss'],
})
export class AssessmentDetailPage implements OnInit {
  public scores$: Observable<Score[]>;
  public category$: Observable<Category>;
  public assessment$: Observable<Assessment>;
  public checklist$: Observable<string[]>;
  public displayChecked: boolean[] = [];
  private aid: string;
  private cid: string;
  private today = new Date().toLocaleDateString();
  public user$ = this.userService.getUser();
  private user: User;
  public curScore: Score;
  private checklistChanged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private navController: NavController,
    private assessmentService: AssessmentService,
    private userService: UserService,
    private alertController: AlertController,
    private routerOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log("assessmentDetailPage.ngOnInit", params);
      this.aid = params.aid;
      this.cid = params.cid;
      this.category$ = this.assessmentService.getCategoryById(params.cid);
      this.assessment$ = this.assessmentService.getAssessmentById(params.aid);
      this.checklist$ = this.assessmentService.getChecklist(params.aid);
      this.routerOutlet.swipeGesture = true;
    });

    this.assessment$.subscribe((assessment) => {
      console.log("getScoresForAssessment", assessment);
      this.scores$ = this.userService.getScoresForAssessment(assessment);
      this.scores$?.subscribe((score) => {
        console.log("score", score);
        if (score.length > 0) {
          // assuming most recent on top or only store one
          this.curScore = score[0];
          this.displayChecked = Array.from(this.curScore.checklist);
        }
      });
    });
    this.user$
      .subscribe((value) => {
        this.user = value;
      })
      .unsubscribe();
  }

  ionViewWillEnter() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (isPlatform('mobile')) {
      // StatusBar.setStyle({style: Style.Dark});
      if (prefersDark.matches) {
        StatusBar.setStyle({style: Style.Dark});
      } else {
        StatusBar.setStyle({style: Style.Light});
      }
    }
  }

  updateChecked(checked) {
    if (this.displayChecked.length) {
      this.checklistChanged = true;
      this.routerOutlet.swipeGesture = false;
    }
    this.displayChecked = checked;
  }

  deleteScore(score: Score) {
    console.log('dispatch deleteAssessmentScore ' + score.scoreDate);
    this.userService.deleteScore(score);
    this.navController.back();
  }

  async openNewScore(assessment: Assessment) {
    const modal = await this.modalCtrl.create({
      component: NewScorePage,
      componentProps: {
        assessment: assessment,
      },
      cssClass: 'new-score-modal',
      presentingElement: document.querySelector('ion-router-outlet'),
      canDismiss: true,
    });
    modal.present();
    modal.onDidDismiss().then((res) => {
      this.navController.back();
    });
  }

  countCheckedItems(): number {
    return this.displayChecked.filter(item => item).length;
  }

  // getCheckedItem(item): boolean {
  //   return this.displayChecked[item];
  // }

  // toggleCheckItem(item) {
  //   this.displayChecked[item] = !this.displayChecked[item];
  //   this.checklistChanged = true;
  //   this.routerOutlet.swipeGesture = false;
  //   console.log("toggleCheckItem", item, this.displayChecked[item]);
  // }

  async saveChecklist() {
    for (var i = 0; i < this.displayChecked.length; i++) {
      console.log("displayChecked", i, this.displayChecked[i]);
      this.displayChecked[i] = this.displayChecked[i] ? true : false;
    }
    const score: Score = {
      aid: this.aid,
      uid: this.user.id,
      checklist: this.displayChecked,
      cid: this.cid,
      rawScore: this.displayChecked.filter(item => item).length,
      scoreDate: this.today,
      expired: false,
    };
    console.log('save new score: ' + JSON.stringify(score));
    this.userService.saveScore(score);
    this.navController.back();
  }

  async goBack() {
    if (this.checklistChanged) {
      await this.promptToSave();
      console.log("finished promptToSave");
    }
    this.navController.back();
  }

  promptToSave(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let alert = this.alertController.create({
        header: 'Unsaved changes',
        // subHeader: 'Warning',
        message: "Are you sure?",
        buttons: [
          {
            text: 'Leave without saving',
            handler: () => {
              this.navController.back();
              return true;
            }
          },
          {
            text: 'Save',
            handler: () => {
              this.saveChecklist();
              return true;
            }
          }
        ],
      }).then((res) => {
        res.present();
      });
    });
  }

}

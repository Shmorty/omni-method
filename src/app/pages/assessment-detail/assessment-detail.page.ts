import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Score } from '../../store/models/score.model';
import { AssessmentService } from '../../services/assessments/assessment.service';
import { Assessment, Category } from '../../store/assessments/assessment.model';
import { NewScorePage } from '../new-score/new-score.page';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import {selectAuthUser} from 'src/app/store/user/user.selectors';
import {first, take} from 'rxjs/operators';
import {User} from 'src/app/store/user/user.model';

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
  private displayChecked: boolean[] = [];
  private aid: string;
  private cid: string;
  private today = new Date().toLocaleDateString();
  public user$ = this.userService.getUser();
  private user: User;
  public curScore: Score;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private navController: NavController,
    private assessmentService: AssessmentService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log("assessmentDetailPage.ngOnInit", params);
      this.aid =params.aid;
      this.cid =params.cid;
      this.category$ = this.assessmentService.getCategoryById(params.cid);
      this.assessment$ = this.assessmentService.getAssessmentById(params.aid);
      this.checklist$ = this.assessmentService.getChecklist(params.aid);
    });

    this.assessment$.subscribe((assessment) => {
      this.scores$ = this.userService.getScoresForAssessment(assessment);
    });
    this.scores$.subscribe((score) => {
      if (score.length > 0) {
        // assuming most recent on top or only store one
        this.curScore = score[0];
        this.displayChecked = Array.from(this.curScore.checklist);
      }
    });
    this.user$
      .subscribe((value) => {
        this.user = value;
      })
      .unsubscribe();
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

  getCheckedItem(item): boolean {
    return this.displayChecked[item];
  }

  toggleCheckItem(item) {
    this.displayChecked[item] = !this.displayChecked[item];
    console.log("toggleCheckItem", item, this.displayChecked[item]);
  }

  async saveChecklist() {
    console.log("saveChecklist", this.displayChecked);
    console.log("count set", this.displayChecked.filter(i => i).length);
    console.log("user", this.user);
    console.log("today", this.today);
    // fill missing values in arrray
    for (var i=0; i < this.displayChecked.length; i++) {
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
}

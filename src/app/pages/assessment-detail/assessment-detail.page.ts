import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Score } from '../../store/models/score.model';
import { AssessmentService } from '../../services/assessments/assessment.service';
import { Assessment, Category } from '../../store/assessments/assessment.model';
import { NewScorePage } from '../new-score/new-score.page';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  assessmentScores,
  selectUser,
} from 'src/app/store/user/user.selectors';
import {
  selectAssessmentById,
  selectCategoryById,
} from 'src/app/store/assessments/assessment.selector';
import { Observable } from 'rxjs';
import { User } from 'src/app/store/user/user.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: './assessment-detail.page.html',
  styleUrls: ['./assessment-detail.page.scss'],
})
export class AssessmentDetailPage implements OnInit {
  public scores$: Observable<Score[]>;
  public category$: Observable<Category>;
  public assessment$: Observable<Assessment>;
  public user$ = this.store.select(selectUser);
  public user: User;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private navController: NavController,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.category$ = this.store.select(selectCategoryById(params.cid));
      this.assessment$ = this.store.select(selectAssessmentById(params.aid));
    });

    this.assessment$.subscribe((assessment) => {
      this.scores$ = this.store.select(assessmentScores(assessment)).pipe(
        tap((results) => {
          results.sort(function (a, b) {
            return Date.parse(b.scoreDate) - Date.parse(a.scoreDate);
          });
        })
      );
    });

    this.user$
      .subscribe({
        next(value) {
          this.user = value;
        },
      })
      .unsubscribe();
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

  getCheckList(aid: string) {
    return this.assessmentService.getChecklist(aid);
  }

  toggleCheckItem(item) {
    console.log(item);
  }
  // async closeModel() {
  //   const close: string = "Modal Removed";
  //   await this.modalController.dismiss(close);
  // }

  // back(): void {
  //   this._location.historyGo(-1);
  // }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController, NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AssessmentService} from 'src/app/services/assessments/assessment.service';
import {CommunityService} from 'src/app/services/community/community.service';
import {OmniScoreService} from 'src/app/services/omni-score.service';
import {UserFirestoreService} from 'src/app/services/user-firestore.service';
import {UserService} from 'src/app/services/user/user.service';
import {Assessment} from '../../store/assessments/assessment.model';
import {selectAllAssessments, selectAllCategories} from 'src/app/store/assessments/assessment.selector';
import {Score} from 'src/app/store/models/score.model';
import {User} from 'src/app/store/user/user.model';

@Component({
  selector: 'app-ranking-detail',
  templateUrl: './ranking-detail.page.html',
  styleUrls: ['./ranking-detail.page.scss'],
})
export class RankingDetailPage implements OnInit {
  // public title: string;
  // public athlete: User;
  public athlete$ = this.communityService.getSelectedUser();
  public categories$ = this.assessmentService.getAllCategories();
  public assessments$ = this.assessmentService.getAllAssessments();
  public isLoading$ = this.communityService.isLoading();
  public scores$: Observable<Score[]>;
  public userScores: Score[];
  showChart = false;

  constructor(
    private assessmentService: AssessmentService,
    private communityService: CommunityService,
    private modalCtrl: ModalController,
    // private route: ActivatedRoute,
    private router: Router,
    private navController: NavController,
  ) {}

  async ngOnInit() {
    console.log("RankingDetailPage.ngOnInit athlete$", this.athlete$);

    // await this.communityService.getSelectedUser().subscribe((usr) => {
    //   if (usr) {
    //     console.log("ngOnInit getSelectedUser", usr);
    //     this.athlete = usr;
    //   } else {
    //     console.log("ngOnInit getSelectedUser returned", usr);
    //   }
    // });
    // await (this.userFirestoreService.getUserById(uid)).subscribe((usr) => {
    //   console.log("RankingDetailPage ngOnInit got usr", usr);
    //   this.athlete = usr;
    // });
    // this.athlete = params.uid;
    // console.log("RankingDetailPage setup title");
    // this.title = this.athlete.username ? '@' + this.athlete.username :
    //   this.athlete.firstName + ' ' + this.athlete.lastName;
    // get slected user's scores
    // this.scores$ = await this.userFirestoreService.getUserScores(uid);
    // this.scores$.subscribe((sc) => {
    //   console.log("score array", sc);
    //   this.userScores = sc;
    // },
    //   (err) => console.error("error", err)
    // );
  }

  // getCategoryScore(cid: string): number {
  //   console.log("getCategoryScore", cid);
  //   return this.athlete?.categoryScore[cid];
  // }

  getCategoryAssessments(assessments: Assessment[], cid: string) {
    return assessments.filter(a => a.cid === cid);
  }

  scoreClass(scoreDate: string): string {
    return OmniScoreService.scoreClass(scoreDate);
  }

  getScore(aid: string) {
    // console.log("getScore", aid);
    // console.log("userScores", this.userScores);
    let fl = this.userScores?.filter(sc => sc.aid === aid).sort(function (a, b) {
      return Date.parse(b.scoreDate) - Date.parse(a.scoreDate);
    });
    return (fl?.length > 0) ? fl[0] : undefined;
  }

  goBack() {
    this.navController.navigateBack('/home/community');
    // this.navController.back();
  }

  // toggleChart(event) {
  //   this.showChart = !this.showChart;
  // }

}
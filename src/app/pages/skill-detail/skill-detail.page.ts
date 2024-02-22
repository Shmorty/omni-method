import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription, take} from 'rxjs';
import {AssessmentService} from '../../services/assessments/assessment.service';
import {NavController} from '@ionic/angular';
import {Score} from '../../store/models/score.model';
import {UserService} from '../../services/user/user.service';
import {Assessment} from '../../store/assessments/assessment.model';
import {User} from 'src/app/store/user/user.model';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.page.html',
  styleUrls: ['./skill-detail.page.scss'],
})
export class SkillDetailPage implements OnInit {
  public aid: string;
  public skillIndex: number;
  public skillChecked = false;
  skill$: Observable<Object>;
  score$: Observable<Score>;
  private scoreSub: Subscription;
  private curScore: Score;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private assessmentService: AssessmentService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      // read query params
      this.aid = params.aid;
      this.skillIndex = params.skill;
      // load skill configuration
      this.skill$ = this.assessmentService.getChecklistSkill(this.aid, this.skillIndex);
      // load current assessment score
      this.score$ = this.userService.getCurrentScoreForAssessment(this.aid);
      this.scoreSub = this.score$.subscribe((score) => {
        // read skill setting
        this.curScore = score;
        console.log("curScore " + JSON.stringify(score));
        if (this.curScore && this.curScore.checklist) {
          this.skillChecked = (this.skillIndex < score.checklist.length) ? score.checklist[this.skillIndex] : false;
        } else {
          this.skillChecked = false;
        }
      });
    });
  }

  ngOnDestroy() {
    this.scoreSub.unsubscribe();
  }

  async toggleSkill($event) {
    var newScore: Score;
    await this.createNewScore().then((score) => {
      console.log("got new score " + JSON.stringify(score));
      newScore = score;
    });
    console.log("toggleSkill " + this.skillChecked);
    // update score
    if (this.skillIndex < newScore.checklist.length) {
      // update value in checklist array
      newScore.checklist[this.skillIndex] = this.skillChecked;
    } else {
      // add elements to array
      for (var i = newScore.checklist.length; i < this.skillIndex; i++) {
        newScore.checklist[i] = false;
      }
      newScore.checklist[this.skillIndex] = this.skillChecked;
      // console.log("need to add code to resize array");
    }
    // update raw score, count checklist items
    newScore.rawScore = newScore.checklist.filter(Boolean).length;
    console.log("newScore " + JSON.stringify(newScore));
    this.userService.saveScore(newScore);
    this.goBack();
  }

  async createNewScore() {
    var newScore: Score;
    var curAssessment: Assessment;
    var curUser: User;
    var today = new Date().toLocaleDateString();
    if (this.curScore) {
      newScore = JSON.parse(JSON.stringify(this.curScore));
    } else {
      var assessment$ = this.assessmentService.getAssessmentById(this.aid);
      await assessment$.subscribe((assessment) => {
        console.log("got assessment " + JSON.stringify(assessment));
        curAssessment = assessment;
      }).unsubscribe();
      var user$ = this.userService.getUser();
      await user$.subscribe((user) => {
        console.log("got user " + JSON.stringify(user));
        curUser = user;
      }).unsubscribe();
      console.log("create newSore for user " + curUser.id + " and assessment " + curAssessment.aid);
      newScore = {
        aid: this.aid,
        uid: curUser.id,
        cid: curAssessment.cid,
        checklist: [],
        rawScore: this.curScore?.rawScore,
        scoreDate: today,
        currentWeight: curUser.weight,
        expired: false,
        notes: '',
      };
    }
    return newScore;
  }

  goBack() {
    this.navController.back();
  }

}

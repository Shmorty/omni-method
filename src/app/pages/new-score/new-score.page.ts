import {Component, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
// import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {User} from '../../store/user/user.model';
import {UserService} from '../../services/user/user.service';
import {Assessment} from '../../store/assessments/assessment.model';
import {Score} from '../../store/models/score.model';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectUser} from 'src/app/store/user/user.selectors';
import {EditPropertyComponent} from 'src/app/component/edit-property/edit-property.component';

@Component({
  selector: 'app-new-score',
  templateUrl: './new-score.page.html',
  styleUrls: ['./new-score.page.scss'],
})
export class NewScorePage implements OnInit {
  activeField: string = 'score';
  @Input() assessment: Assessment;
  @Input() curScore: Score;
  public newScore: Score;
  // @ViewChild('rawScore') scoreInput;
  // formData: FormGroup;
  today = new Date();
  public user$ = this.userService.getUser();
  private user: User;
  scoreDate: string;
  rawScore: number;
  bodyWeight: number;

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
  ) {}

  ngOnInit() {
    console.log("newScore ngOnInit");
    // prefill with local date in iso format 
    var today = new Date().toLocaleString('sv').replace(' ', 'T');

    this.user$
      .subscribe((value) => {
        this.user = value;
        this.bodyWeight = this.user.weight;
        if (this.newScore) {
          this.newScore.currentWeight = this.bodyWeight;
        }
      })
      .unsubscribe();

    console.log("prevScore", this.curScore.rawScore);

    this.newScore = {
      aid: this.assessment.aid,
      uid: this.user.id,
      cid: this.assessment.cid,
      rawScore: this.curScore?.rawScore,
      scoreDate: today,
      currentWeight: this.bodyWeight,
      expired: false,
      notes: '',
    };

    console.log("ngOnInit", this.newScore);
    // console.log("ngOnInit scoreInput", this.scoreInput);
  }

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    console.log("visibilitychange");
    if (document.hidden) {
      console.log("hidden");
    } else {
      console.log("visible");
    }
  }

  activate(tab: string) {
    console.log("activate", tab);
    this.activeField = tab;
  }

  tabClass(tab: string) {
    return (this.activeField === tab ? "active-tab" : "");
  }

  setScore(val) {
    this.newScore.rawScore = val;
  }

  setWeight(val) {
    console.log("setWeight", val);
    this.newScore.currentWeight = val;
  }

  setNotes(val) {
    console.log("setNotes", val);
    this.newScore.notes = val;
  }

  direction(assessment: Assessment) {
    // const reverse = ["PSPR", "TWOMDST", "AGLTY"];
    const reverse = ["PSPR", "AGLTY"];
    if (reverse.includes(assessment.aid)) {
      return -1;
    }
    return 1;
  }

  // ionViewDidEnter() {
  //   console.log("newScore ionViewDidEnter scoreInput", this.scoreInput);
  //   setTimeout(() => {
  //     console.log("set form focus");
  //     this.scoreInput?.setFocus();
  //   }, 150);
  // }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    console.log('this.assessment.aid: ' + this.assessment.aid);
    console.log('this.user.id: ' + this.user.id);
    console.log('save new score: ', this.newScore);
    this.userService.saveScore(this.newScore);
    this.dismiss();
  }

  inputMode(assessment: Assessment): string {
    if (assessment.min < 0) {
      return 'text';
    }
    return 'decimal';
  }

}

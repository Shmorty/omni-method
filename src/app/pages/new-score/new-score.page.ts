import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
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
    // prefill date
    var today = new Date().toLocaleDateString();
    // var today = new Date();

    this.user$
      .subscribe((value) => {
        this.user = value;
        this.bodyWeight = this.user.weight;
        // this.formData = new FormGroup({
        //   rawScore: new FormControl('', [
        //     Validators.required,
        //     Validators.min(this.assessment.min),
        //     Validators.max(this.assessment.max),
        //   ]),
        //   scoreDate: new FormControl(today, Validators.required),
        //   notes: new FormControl(''),
        //   currentWeight: new FormControl(value.weight, [
        //     Validators.required,
        //   ]),
        // });
      })
      .unsubscribe();

    this.newScore = {
      aid: this.assessment.aid,
      uid: this.user.id,
      cid: this.assessment.cid,
      rawScore: 0,
      scoreDate: today,
      currentWeight: this.bodyWeight,
      expired: false,
      notes: '',
    };

    console.log("ngInit", this.newScore);
    // console.log("ngOnInit scoreInput", this.scoreInput);
  }

  activate(tab: string) {
    this.activeField = tab;
  }

  tabClass(tab: string) {
    return (this.activeField === tab ? "active-tab" : "");
  }

  setScore(val) {
    this.newScore.rawScore = val;
  }

  setWeight(val) {
    this.newScore.currentWeight = val;
  }

  direction(assessment: Assessment) {
    const reverse = ["PSPR", "TWOMDST", "AGLTY"];
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
    // this.newScore = {
    //   aid: this.assessment.aid,
    //   uid: this.user.id,
    //   cid: this.assessment.cid,
    //   rawScore: this.rawScore,
    //   scoreDate: this.scoreDate,
    //   currentWeight: this.bodyWeight,
    //   expired: false,
    // };
    console.log('save new score: ', this.newScore);
    // this.userService.saveScore(this.newScore);
    this.dismiss();
  }

  // get rawScore() {
  //   return this.formData.get('rawScore');
  // }

  // get scoreDate() {
  //   return this.formData.get('scoreDate');
  // }

  inputMode(assessment: Assessment): string {
    if (assessment.min < 0) {
      return 'text';
    }
    return 'decimal';
  }

  async showInput(assessment: Assessment) {
    const modal = await this.modalCtrl.create({
      component: EditPropertyComponent,
      componentProps: {
        // targetProperty: assessment.aid,
        targetProperty: 'weight',
        user: this.user
      },
      cssClass: "custom-popover",
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log("closed modal", data);
    }
  }
}

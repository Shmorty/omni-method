import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {User} from '../../store/user/user.model';
import {UserService} from '../../services/user/user.service';
import {Assessment} from '../../store/assessments/assessment.model';
import {Score} from '../../store/models/score.model';
import {Subscription} from 'rxjs';
import {NumberPickerService} from 'src/app/services/number-picker.service';

@Component({
  selector: 'app-new-score',
  templateUrl: './new-score.page.html',
  styleUrls: ['./new-score.page.scss'],
})
export class NewScorePage implements OnInit, OnDestroy {
  activeField: string = 'score';
  @Input() assessment: Assessment;
  @Input() curScore: Score;
  public newScore: Score = {} as Score;
  public today = new Date().toISOString();
  public user$ = this.userService.getUser();
  private user: User;
  scoreDate: string;
  // rawScore: number;
  bodyWeight: number;
  numberPickerSubscription: Subscription;
  // scorePickerColumns: PickerColumn[] = [];
  // scorePickerButtons: PickerButton[] = [];
  // weightPickerColumns: PickerColumn[] = [];
  // weightPickerButtons: PickerButton[] = [];

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private numberPickerService: NumberPickerService,
  ) {}

  async ngOnInit() {
    console.log("newScore ngOnInit assessment " + JSON.stringify(this.assessment));
    console.log("newScore ngOnInit curScore " + JSON.stringify(this.curScore));

    await this.user$
      .subscribe((value) => {
        this.user = value;
        console.log("newScore page updated user", this.user);
        this.bodyWeight = this.user.weight;
        this.newScore = {
          aid: this.assessment.aid,
          uid: this.user.id,
          cid: this.assessment.cid,
          rawScore: this.curScore?.rawScore,
          scoreDate: this.today,
          currentWeight: this.bodyWeight,
          expired: false,
          notes: '',
        } as Score;
      }).unsubscribe();

    // subscribe to number picker value update
    // this.numberPickerSubscription = this.numberPickerService.currentValue
    //   .subscribe((val) => this.gotUpdate(val as Score));
  }

  ngOnDestroy(): void {
    if (this.numberPickerSubscription) {
      this.numberPickerSubscription.unsubscribe();
    }
  }

  gotUpdate(val: Score) {
    if (Object.keys(val).length > 1 && val.aid === this.assessment.aid) {
      console.log("gotUpdate Score from picker", val);
      this.newScore = val;
      if (this.numberPickerSubscription) {
        this.numberPickerSubscription.unsubscribe();
      }
    }
  }

  activate(tab: string): void {
    console.log("activate", tab);
    this.activeField = tab;
    switch (tab) {
      case 'scoreDate': {
        console.log("open scoreDate picker");
        break;
      }
      case 'score': {
        this.numberPickerService.openScorePicker(this.assessment, this.newScore)
          .then(() => {
            console.log("score picker open");
            if (this.numberPickerSubscription) {
              this.numberPickerSubscription.unsubscribe();
            }
            this.numberPickerSubscription = this.numberPickerService.currentValue
              .subscribe((val) => this.gotUpdate(val as Score));
          });
        break;
      }
      case 'bodyWeight': {
        this.numberPickerService.openWeightPicker(this.newScore)
          .then(() => {
            console.log("bodyWeight picker is open");
            if (this.numberPickerSubscription) {
              this.numberPickerSubscription.unsubscribe();
            }
            this.numberPickerSubscription = this.numberPickerService.currentValue
              .subscribe((val) => this.gotUpdate(val as Score));
          });
        break;
      }
    }
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

  setNotes(val) {
    this.newScore.notes = val;
  }

  direction(assessment: Assessment) {
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

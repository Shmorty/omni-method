import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { User } from '../../store/user/user.model';
import { UserService } from '../../services/user/user.service';
import { Assessment } from '../../store/assessments/assessment.model';
import { Score } from '../../store/models/score.model';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-new-score',
  templateUrl: './new-score.page.html',
  styleUrls: ['./new-score.page.scss'],
})
export class NewScorePage implements OnInit {
  @Input() assessment: Assessment;
  @Output() score: Score;
  formData: FormGroup;
  today = new Date();
  public user$ = this.userService.getUser();
  private user: User;

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService
  ) {}

  ngOnInit() {
    // prefill date
    var today = new Date().toLocaleDateString();
    this.formData = new FormGroup({
      rawScore: new FormControl('', [
        Validators.required,
        Validators.min(this.assessment.min),
        Validators.max(this.assessment.max),
      ]),
      scoreDate: new FormControl(today, Validators.required),
      notes: new FormControl(''),
    });
    this.user$
      .subscribe((value) => {
        this.user = value;
      })
      .unsubscribe();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    console.log('this.assessment.aid: ' + this.assessment.aid);
    console.log('this.user.id: ' + this.user.id);
    this.score = {
      aid: this.assessment.aid,
      uid: this.user.id,
      rawScore: this.formData.controls['rawScore'].value,
      scoreDate: this.formData.controls['scoreDate'].value,
      notes: this.formData.controls['notes'].value,
    };
    console.log('save new score: ' + JSON.stringify(this.score));
    this.userService.saveScore(this.score);
    this.dismiss();
  }

  get rawScore() {
    return this.formData.get('rawScore');
  }

  get scoreDate() {
    return this.formData.get('scoreDate');
  }

  inputMode(assessment: Assessment): string {
    if (assessment.min < 0) {
      return 'text';
    }
    return 'decimal';
  }
}

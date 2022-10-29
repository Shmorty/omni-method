import { Component, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { User } from '../../store/models/user.model';
import { UserService } from '../../api/user/user.service';
import { Assessment } from '../../store/models/assessment.model';
import { Score } from '../../store/models/score.model';

@Component({
  selector: 'app-new-score',
  templateUrl: './new-score.page.html',
  styleUrls: ['./new-score.page.scss'],
})
export class NewScorePage implements OnInit {
  @Input() assessment: Assessment;
  // @Input() user: User;
  @Output() score: Score;
  formData: FormGroup;
  today = new Date();

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService
  ) {}

  ngOnInit() {
    // prefill date
    var today = new Date().toLocaleDateString();
    console.log('today is ' + today);
    console.log('assessment: ' + this.assessment.aid);
    console.log(this.today.toLocaleDateString());
    this.formData = new FormGroup({
      rawScore: new FormControl('', Validators.required),
      scoreDate: new FormControl(today, Validators.required),
      notes: new FormControl(''),
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    this.score = {
      aid: this.assessment.aid,
      uid: this.userService.getCurrentUser().id,
      rawScore: this.formData.controls['rawScore'].value,
      scoreDate: this.formData.controls['scoreDate'].value,
      notes: this.formData.controls['notes'].value,
    };
    console.log('score: ' + JSON.stringify(this.score));
    this.userService.saveScore(this.score).subscribe(
      (data) => {
        console.log('saveScore returned ' + JSON.stringify(data));
        this.dismiss();
      },
      (err) => {
        console.log('Error: ' + err().message);
        alert(err().message);
        this.dismiss();
      }
    );
  }

  get rawScore() {
    return this.formData.get('rawScore');
  }

  get scoreDate() {
    return this.formData.get('scoreDate');
  }
}

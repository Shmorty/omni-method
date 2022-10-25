import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/api/user/user.service';
import { Assessment } from 'src/app/store/models/assessment.model';

@Component({
  selector: 'app-new-score',
  templateUrl: './new-score.page.html',
  styleUrls: ['./new-score.page.scss'],
})
export class NewScorePage implements OnInit {
  @Input() public assessment: Assessment;
  formData: FormGroup;
  today = new Date();

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log(this.today.toLocaleDateString());
    this.formData = new FormGroup({
      rawScore: new FormControl('', Validators.required),
      scoreData: new FormControl('', Validators.required),
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.formData.value);
    this.userService.saveScore(this.formData.value);
  }

  get rawScore() {
    return this.formData.get('rawScore');
  }

  get scoreDate() {
    return this.formData.get('scoreDate');
  }
}

import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {Gender} from 'src/app/store/user/user.model';

@Component({
  selector: 'app-gender-picker',
  standalone: true,
  templateUrl: './gender-picker.component.html',
  styleUrls: ['./gender-picker.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class GenderPickerComponent implements OnInit {
  @Input() gender: Gender;
  @Output() genderChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  setGender(value: Gender) {
    this.gender = value;
  }

}

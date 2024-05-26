import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Gender} from 'src/app/store/user/user.model';

@Component({
  selector: 'app-gender-picker',
  standalone: true,
  templateUrl: './gender-picker.component.html',
  styleUrls: ['./gender-picker.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class GenderPickerComponent implements OnInit, ControlValueAccessor {
  @Input() gender: Gender;
  @Output() genderChange = new EventEmitter<Gender>();

  genderValue = new FormControl('');

  constructor() {}

  ngOnInit() {}

  setGender(value: Gender) {
    console.log("setGender", value);
    this.gender = value;
    this.genderValue.setValue(value);
    this.genderChange.emit(value);
  }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

}

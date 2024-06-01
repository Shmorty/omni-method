import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Gender} from 'src/app/store/user/user.model';

@Component({
  selector: 'app-gender-picker',
  standalone: true,
  templateUrl: './gender-picker.component.html',
  styleUrls: ['./gender-picker.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GenderPickerComponent
    }
  ],
})
export class GenderPickerComponent implements OnInit, ControlValueAccessor {
  @Input() gender: Gender;
  @Output() genderChange = new EventEmitter<Gender>();
  onChange = (gender) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  constructor() {}

  ngOnInit() {
    console.log("GenderPicker ngOnInit", this.gender);
  }

  setGender(value: Gender) {
    console.log("setGender", value);
    this.markAsTouched();
    if (!this.disabled) {
      this.gender = value;
      // this.genderValue.setValue(value);
      this.onChange(this.gender);
      this.genderChange.emit(this.gender);
    }
  }

  writeValue(val: Gender): void {
    this.gender = val;
  }
  registerOnChange(onChange: any): void {
    console.log("registerOnChange", onChange);
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

}

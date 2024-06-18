import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {IonPicker} from "@ionic/angular/standalone";

@Component({
  selector: 'app-distance-speed-picker',
  templateUrl: './distance-speed-picker.component.html',
  styleUrls: ['./distance-speed-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class DistanceSpeedPickerComponent implements OnInit {
  @Input() min = 0;
  @Input() max = 100;
  @Input() increment = 1;
  @Input() units: string;
  @Input() direction = 1;
  @Input() rowHeight = 34;
  @Input() pickerValue: number;
  @Output() pickerValueChange = new EventEmitter<number>();
  public range: number[];
  public mphPickerValue: number;
  public mph_range: number[];
  public unit_choices: string[];
  public input_units: string;
  private mphIncrement = 0.1; // = 0.3;
  // private minutes: 2;

  constructor() {}

  ngOnInit() {
    this.range = this.createRange(this.min, this.max, this.increment);
    this.unit_choices = ["Miles", "mph"];
    this.input_units = this.unit_choices[0];
    // "min": 0, "max": 0.5, "increment": 0.001,

    const mphMin = this.min * 30;
    const mphMax = this.max * 30;
    const inv = 1 / this.mphIncrement;
    this.mphPickerValue = Math.round(this.pickerValue * 30 * inv) / inv;
    // this.mphPickerValue = Math.round(this.pickerValue * 30 * 10) / 10;
    this.mph_range = this.createRange(mphMin, mphMax, this.mphIncrement);
  }

  onPickerValueChange(event) {
    const inv = 1 / this.mphIncrement;
    this.mphPickerValue = Math.round(event.detail.value * 30 * inv) / inv;
    this.pickerValueChange.emit(event.detail.value);
  }

  onPickerMPHChange(event) {
    const inv = 1 / this.increment;
    this.pickerValue = Math.round(event.detail.value / 30 * inv) / inv;
    this.pickerValueChange.emit(this.pickerValue);
  }

  onPickerUnitsChange(event) {
    this.input_units = event.detail.value;
  }


  private createRange(min: number, max: number, increment: number): number[] {
    const len = (max - min) / increment + 1;
    // force integer math avoid floating point issues
    const reciprocal = 1 / increment;
    console.log("distance-picker min", min, "max", max, "increment", increment, "reciprocal", reciprocal, "len", len);

    if (Number.isInteger(min) && Number.isInteger(increment)) {
      // console.log("divide index by reciprocal");
      return Array.from(
        {length: len},
        (_, index) => min + index / reciprocal);
    } else {
      // console.log("multiply min by reciprocal");
      return Array.from(
        {length: len},
        (_, index) => (min * reciprocal + index / reciprocal * reciprocal) / reciprocal);
    }
  }

}

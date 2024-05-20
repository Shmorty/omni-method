import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-height-picker',
  standalone: true,
  templateUrl: './height-picker.component.html',
  styleUrls: ['./height-picker.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class HeightPickerComponent implements OnInit {
  @Input() feet = 4;
  @Input() inches = 6;
  @Output() feetChange = new EventEmitter<number>();
  @Output() inchesChange = new EventEmitter<number>();
  public rangeFeet: number[]; // 3..7
  public rangeInches: number[]; // 0..11

  constructor() {}

  ngOnInit() {
    this.rangeFeet = [3, 4, 5, 6, 7];
    this.rangeInches = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }

  onPickerColumnChange(e) {
    console.log("onPickerColumnChange", e);
    console.log("target.id", e.target.id);
    console.log("target.value", e.target.value);
    if (e.target.id === "feet") {
      this.feetChange.emit(e.target.value);
    } else if (e.target.id === "inches") {
      this.inchesChange.emit(e.target.value);
    }
  }
}

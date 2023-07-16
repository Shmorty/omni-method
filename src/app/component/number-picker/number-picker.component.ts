import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
})
export class NumberPickerComponent implements OnInit {
  min = 0;
  max = 100;
  size = 7;
  range = [];

  constructor() {}

  ngOnInit() {
    this.range = [0, 1, 2, 3, 4];
  }

}

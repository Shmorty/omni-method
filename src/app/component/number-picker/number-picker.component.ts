import {Component, OnInit} from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  standalone: true,
  imports: [ScrollingModule, CommonModule],
})
export class NumberPickerComponent implements OnInit {
  min = 0;
  max = 100;
  size = 7;
  range = [];

  constructor() {}

  ngOnInit() {
    this.range = Array.from({length: 100}).map((_, i) => `Item #${i}`);
  }

}

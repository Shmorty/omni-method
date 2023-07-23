import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport, ScrollDispatcher, ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ScrollingModule, CommonModule, IonicModule],
})
export class NumberPickerComponent implements OnInit {
  @Input() min = 0;
  @Input() max = 100;
  @Input() increment = 1;
  @Output() value = new EventEmitter<number>;
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  range: number[] = [];

  constructor(private scrollDispatcher: ScrollDispatcher) {}

  ngOnInit() {
    const len = (this.max - this.min) / this.increment + 1;
    console.log("len", len);
    this.range = Array.from(
      {length: len},
      (_, index) => this.min + index * this.increment);

  }

  ngAfterViewInit(): void {
    this.viewPort.scrolledIndexChange.subscribe(index => {
      this.value.emit(this.range[index]);
    })
    // this.viewPort.scrolledIndexChange
    //   .subscribe(event => {
    //     console.log("indexChanged");
    //   })
    // this.viewPort.elementScrolled()
    //   .subscribe(event => {
    //     console.log('scrolled', event);
    //   });
  }

  click(item) {
    // console.log("click", item);
    this.viewPort.scrollToIndex(item);
  }
}

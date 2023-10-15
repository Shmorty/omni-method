import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport, ScrollDispatcher, ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ScrollingModule, CommonModule, IonicModule],
})
export class NumberPickerComponent implements OnInit, OnChanges {
  @Input() min = 0;
  @Input() max = 100;
  @Input() increment = 1;
  @Input() units = "";
  @Input() direction = 1;
  @Input() rowHeight = 34;
  @Input() value: number;
  @Output() valueChange = new EventEmitter<number>;
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  range: number[] = [];
  public curIndex = 0;
  private startIndex = 0;
  private timeoutId = undefined;

  constructor(private scrollDispatcher: ScrollDispatcher) {}

  ngOnInit() {
    const len = (this.max - this.min) / this.increment + 1;
    console.log("len", len);
    this.range = Array.from(
      {length: len},
      (_, index) => this.min + index * this.increment);
    if (this.direction == -1) {
      this.range = this.range.reverse();
    }
    this.startIndex = this.range.indexOf(this.value);
  }

  ngAfterViewInit(): void {
    console.log("NumberPickerComponent ngAfterViewInit");
    this.viewPort.scrolledIndexChange.subscribe(index => {
      // console.log("scrolledIndexChange", index);
      if (typeof this.timeoutId == "number") {
        clearTimeout(this.timeoutId);
      }
      // console.log("indexChange scrollToIndex", index);
      this.curIndex = index;
      // this.viewPort.scrollToIndex(index);
      // console.log("emit", this.range[index]);
      this.valueChange.emit(this.range[index]);
      this.timeoutId = setTimeout(() => {
        this.viewPort.scrollToIndex(index, 'smooth');
        this.timeoutId = undefined;
      }, 350);
    });
    // set initial value
    setTimeout(() => {
      this.viewPort.scrollToIndex(this.startIndex);
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes", changes);
  }

  curClass(index) {
    if (index == this.curIndex) {
      return "current"
    }
  }

  click(item) {
    // console.log("click", item);
    this.viewPort.scrollToIndex(item, 'smooth');
  }
}

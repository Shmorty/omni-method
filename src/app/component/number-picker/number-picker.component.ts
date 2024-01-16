import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport, ScrollDispatcher, ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {Haptics} from '@capacitor/haptics';

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
  range: number[];
  public curIndex = 0;
  private startIndex = 0;
  private timeoutId = undefined;

  constructor(private scrollDispatcher: ScrollDispatcher) {}

  ngOnInit() {
    this.range = this.createRange();
    console.log("number-picker range", this.range);
    if (this.direction == -1) {
      console.log("reverse");
      this.range = this.range.reverse();
    }
    // console.log("ngOnInit value", this.value);
    // console.log("ngOnInit range", this.range);
    this.startIndex = this.range.indexOf(this.value);
    console.log("ngOnInit startIndex", this.startIndex);
    // this.viewPort.scrollToIndex(this.startIndex);
  }

  ngAfterViewInit(): void {
    console.log("NumberPickerComponent ngAfterViewInit");

    // set initial value after delay
    setTimeout(() => {
      var currentRange = this.viewPort.getRenderedRange();
      console.log("currentRange before", currentRange);
      this.viewPort.checkViewportSize();
      console.log("scrollTo startIndex", this.startIndex);
      this.viewPort.scrollToIndex(this.startIndex);
      currentRange = this.viewPort.getRenderedRange();
      console.log("currentRange after", currentRange);
    }, 200);

    // subscribe to updates
    this.viewPort.scrolledIndexChange.subscribe((index) => {
      console.log("scrolledIndexChange", index);
      this.hapticsSelectionChanged();
      if (typeof this.timeoutId == "number") {
        clearTimeout(this.timeoutId);
        Haptics.selectionStart();
      }
      // console.log("indexChange scrollToIndex", index);
      if (this.curIndex !== index) {
        this.curIndex = index;
        // console.log("viewPort.scrolledIndexChange emit", this.range[index]);
        this.valueChange.emit(this.range[index]);
      }
      // center selection
      console.log("schedule align to", index);
      this.timeoutId = setTimeout(() => {
        console.log("align to", index, "should equal", this.curIndex)
        this.viewPort.scrollToIndex(this.curIndex, 'smooth');
        this.timeoutId = undefined;
      }, 350);
    });

  }

  private createRange(): number[] {
    const len = (this.max - this.min) / this.increment + 1;
    // force integer math avoid floating point issues
    const reciprocal = 1 / this.increment;
    console.log("number-picker min", this.min, "max", this.max, "increment", this.increment, "reciprocal", reciprocal, "len", len);

    if (Number.isInteger(this.min)) {
      console.log("divide index by reciprocal");
      return Array.from(
        {length: len},
        (_, index) => this.min + index / reciprocal);
    } else {
      console.log("multiply min by reciprocal");
      return Array.from(
        {length: len},
        (_, index) => (this.min * reciprocal + index / reciprocal * reciprocal) / reciprocal);
    }
    // return Array.from(
    //   {length: len},
    //   (_, index) => this.min + index * this.increment);
    // (_, index) => (this.min + index) / reciprocal);
    //(this.min + index * multiplier * this.increment) / multiplier
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes", changes);
    // if (!changes.value.firstChange) {
    //   console.log("ngOnChanges emit", changes.value.currentValue);
    //   this.valueChange.emit(changes.value.currentValue);
    // }
  }

  hapticsSelectionChanged = async () => {
    await Haptics.selectionChanged();
  };

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

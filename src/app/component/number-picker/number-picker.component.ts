import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport, ScrollDispatcher, ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {Haptics} from '@capacitor/haptics';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-number-picker',
  standalone: true,
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollingModule, CommonModule, IonicModule],
})
export class NumberPickerComponent implements OnInit, OnChanges {
  @Input() min = 0;
  @Input() max = 100;
  @Input() increment = 1;
  @Input() units: string;
  @Input() direction = 1;
  @Input() rowHeight = 34;
  @Input() pickerValue: number;
  @Output() pickerValueChange = new EventEmitter<number>();
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  range: number[];
  public curIndex;
  private startIndex = 0;
  private timeoutId = undefined;
  private sub: Subscription = null;

  onChanges = new Subject<SimpleChanges>();

  constructor(private scrollDispatcher: ScrollDispatcher) {}

  ngOnInit() {
    this.range = this.createRange();
    console.log("number-picker range", this.range);
    if (this.direction == -1) {
      console.log("reverse");
      this.range = this.range.reverse();
    }
    this.onChanges.subscribe((data: SimpleChanges) => {
      console.log("changes", data);
      if (data.pickerValue) {
        // respond to external change to value
        const newIndex = this.range.indexOf(this.pickerValue);
        this.viewPort.scrollToIndex(newIndex);
      }
    });
  }

  ngAfterViewInit(): void {
    // find index of initial value
    // this.curIndex =
    this.startIndex = this.range.indexOf(this.pickerValue);
    console.log("set startIndex " + this.startIndex + " pickerValue " + this.pickerValue);
    // set initial value after small delay
    setTimeout((ctx) => {
      console.log("scrollTo startIndex", ctx.startIndex);
      ctx.viewPort.scrollToIndex(ctx.startIndex);
      // subscribe to updates
      this.sub = this.viewPort.scrolledIndexChange.subscribe((index) => {
        // respond to picker updates
        console.log("scrolledIndexChange " + index);
        if (this.curIndex !== index) {
          this.curIndex = index;
          this.pickerValue = this.range[this.curIndex];
          this.pickerValueChange.emit(this.pickerValue);
        }

        this.hapticsSelectionChanged();
        console.log("timeoutId-" + this.timeoutId + " max " + this.max);
        if (typeof this.timeoutId === "number") {
          console.log("clearTimeout max " + this.max);
          clearTimeout(this.timeoutId);
          Haptics.selectionStart();
        }

        // center selection
        console.log("schedule align to", index);
        this.timeoutId = setTimeout((ctx) => {
          console.log("align to " + index + " should equal " + ctx.curIndex + " max " + this.max);
          ctx.viewPort.scrollToIndex(ctx.curIndex, 'smooth');
          ctx.timeoutId = undefined;
        }, 350, this);
      });
    }, 250, this);

  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit");
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges triggerd " + JSON.stringify(changes));
    this.onChanges.next(changes);
  }

  ngOnDestroy() {
    console.log("ngOnDestroy value " + this.range[this.curIndex]);
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private createRange(): number[] {
    const len = (this.max - this.min) / this.increment + 1;
    // force integer math avoid floating point issues
    const reciprocal = 1 / this.increment;
    console.log("number-picker min", this.min, "max", this.max, "increment", this.increment, "reciprocal", reciprocal, "len", len);

    if (Number.isInteger(this.min)) {
      // console.log("divide index by reciprocal");
      return Array.from(
        {length: len},
        (_, index) => (this.min + index) / reciprocal);
    } else {
      // console.log("multiply min by reciprocal");
      return Array.from(
        {length: len},
        (_, index) => (this.min * reciprocal + index / reciprocal * reciprocal) / reciprocal);
    }
  }

  hapticsSelectionChanged = async () => {
    await Haptics.selectionChanged();
  };

  curClass(index) {
    if (index === this.curIndex) {
      return "current"
    }
  }

  click(item) {
    // console.log("click", item);
    this.viewPort.scrollToIndex(item, 'smooth');
  }
}

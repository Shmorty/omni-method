import {AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
// import {CdkVirtualScrollViewport, ScrollDispatcher, ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
// import {Haptics} from '@capacitor/haptics';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-number-picker',
  standalone: true,
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // ScrollingModule,
    CommonModule,
    IonicModule],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NumberPickerComponent implements OnInit, AfterViewInit { // }, OnChanges {
  @Input() min = 0;
  @Input() max = 100;
  @Input() increment = 1;
  @Input() units: string;
  @Input() direction = 1;
  @Input() rowHeight = 34;
  @Input() pickerValue: number;
  @Output() pickerValueChange = new EventEmitter<number>();
  // @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  range: number[];
  public curIndex;
  private startIndex = 0;
  // private timeoutId = undefined;
  private sub: Subscription = null;

  // onChanges = new Subject<SimpleChanges>();

  constructor(
    // private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit() {
    this.range = this.createRange();
    console.log("number-picker range", this.range);
    if (this.direction == -1) {
      console.log("reverse");
      this.range = this.range.reverse();
    }
    // this.sub = this.onChanges.subscribe((data: SimpleChanges) => {
    //   console.log("changes", data);
    //   if (data.pickerValue) {
    //     // respond to external change to value
    //     const newIndex = this.range.indexOf(this.pickerValue);
    //     this.viewPort.scrollToIndex(newIndex);
    //   }
    // });
  }

  ngAfterViewInit(): void {
    // find index of initial value
    this.startIndex = this.range.indexOf(this.pickerValue);
    console.log("set startIndex " + this.startIndex + " pickerValue " + this.pickerValue);
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit");
  }

  onPickerColumnChange(event) {
    this.pickerValueChange.emit(event.detail.value);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log("ngOnChanges triggerd " + JSON.stringify(changes));
  //   this.onChanges.next(changes);
  // }

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

    if (Number.isInteger(this.min) && Number.isInteger(this.increment)) {
      // console.log("divide index by reciprocal");
      return Array.from(
        {length: len},
        (_, index) => this.min + index / reciprocal);
    } else {
      // console.log("multiply min by reciprocal");
      return Array.from(
        {length: len},
        (_, index) => (this.min * reciprocal + index / reciprocal * reciprocal) / reciprocal);
    }
  }

}

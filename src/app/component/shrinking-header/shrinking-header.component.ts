import {Component, ContentChild, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';

@Directive({
  selector: 'shrinking-header-content',
  standalone: true,
})
export class ShrinkingHeaderContent {
  @Input() fade = false;
  @Input() shrink = false;

  constructor(public elementRef: ElementRef) {}
}


@Component({
  selector: 'app-shrinking-header',
  templateUrl: './shrinking-header.component.html',
  styleUrls: ['./shrinking-header.component.scss'],
  standalone: true,
})
export class ShrinkingHeaderComponent implements OnInit {
  @Input() headerHeight = 200;
  @Input() minHeight = 50;
  @Input() color: string;
  header: any;
  content: any;
  @ViewChildren('shrinking-header-content') hdrContent: QueryList<any>;
  // @ContentChildren(ShrinkingHeaderContent) hdrContent: QueryList<ShrinkingHeaderContent>;


  constructor(public element: ElementRef, public renderer: Renderer2) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    // this.header = this.renderer.parentNode(document.getElementById('header'));
    this.header = this.element.nativeElement;
    this.content = this.renderer.nextSibling(this.header);
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');

    this.content.addEventListener('ionScroll', (ev) => {
      this.resizeHeader(ev);
    });

    // this.hdrContent.forEach((content) => {
    //   content.elementRef.nativeElement.style.background = "red";
    // });
  }

  // @HostListener('ionScroll', ['$event']) // for scroll events of the current element
  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onScroll(event) {
  //   console.log("onScroll", event);
  // }

  resizeHeader(ev) {
    let newHeight = this.headerHeight - ev.detail.currentY / 2;
    if (newHeight < this.minHeight) {
      newHeight = this.minHeight;
    }

    const percent = this.convertRange(newHeight);
    this.hdrContent.forEach((content) => {
      if (content.fade) {
        content.elementRef.nativeElement.style.opacity = percent;
      }
      if (content.shrink) {
        if (percent >= 0.5) {
          // content.elementRef.nativeElement.style.scale = percent;
          content.elementRef.nativeElement.style.height = percent + '%';
        }
      }
    });

    if (percent < 0.1) {
      this.renderer.setStyle(document.getElementById('header'), 'border-bottom-right-radius', '0');
    }

    // this.renderer.setStyle(this.hdrContent.first.elementRef.nativeElement, 'transform', `rotateX(${360 * percent}deg)`);
    // this.renderer.setStyle(this.hdrContent.last.elementRef.nativeElement, 'transform', `rotate(${360 * percent}deg)`);
    // console.log("transform rotate", (360 * percent));

    // console.log("percent", percent);
    // this.header.style.opacity = percent;

    // let fontsize = newHeight / this.headerHeight;
    // let fontsize = percent;
    // if (fontsize >= 0.5) {
    //   this.header.style.fontSize = fontsize + 'em';
    // }

    this.header.style.height = newHeight + 'px';
  }

  convertRange(value: number) {
    // OldRange = (OldMax - OldMin)  
    // NewRange = (NewMax - NewMin)  
    // NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin
    const range = (this.headerHeight - this.minHeight);
    return ((value - this.minHeight) / range);
  }

}

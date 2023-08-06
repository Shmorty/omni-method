import {Component, Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: 'shrinking-header-fading-content',
  standalone: true,
})
export class FadingContent {}

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


  constructor(public element: ElementRef, public renderer: Renderer2) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.header = this.renderer.parentNode(document.getElementById('header'));
    this.content = this.renderer.nextSibling(this.header);
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');

    this.content.addEventListener('ionScroll', (ev) => {
      this.resizeHeader(ev);
    });
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

    let fontsize = newHeight / this.headerHeight;
    if (fontsize >= 0.5) {
      this.header.style.fontSize = fontsize + 'em';
    }

    this.header.style.height = newHeight + 'px';
  }

}

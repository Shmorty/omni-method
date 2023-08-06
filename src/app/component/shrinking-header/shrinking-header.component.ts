import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-shrinking-header',
  templateUrl: './shrinking-header.component.html',
  styleUrls: ['./shrinking-header.component.scss'],
  standalone: true,
})
export class ShrinkingHeaderComponent implements OnInit {
  @Input() headerHeight: number;
  header: any;
  content: any;
  newHeight: any;


  constructor(public element: ElementRef, public renderer: Renderer2) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.header = document.getElementById('header');
    console.log("header", this.header);
    // this.content = document.getElementById('#content');
    // this.content = this.renderer.nextSibling(this.header);
    const parent = this.renderer.parentNode(this.header);
    this.header = parent;
    this.content = this.renderer.nextSibling(parent);
    console.log("content", this.content);
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
    console.log("resizeHeader", ev);
    // console.log("headerHeight", this.headerHeight);
    console.log("currentY", ev.detail.currentY);
    // this.newHeight = this.headerHeight - window.pageYOffset / 2;
    this.newHeight = this.headerHeight - ev.detail.currentY / 2;

    if (this.newHeight < 50) {
      this.newHeight = 50;
    }

    let fontsize = this.newHeight / this.headerHeight;
    if (fontsize >= 0.5) {
      this.header.style.fontSize = fontsize + 'em';
    }
    console.log("newHeight", this.newHeight);
    // if (this.newHeight >= this.headerHeight) {
    this.header.style.height = this.newHeight + 'px';
    // }

  }

}

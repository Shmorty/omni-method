import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-image',
  standalone: true,
  template: `
  <img src="{{imageSrc}}" (click)="dismiss()"/>
  `,
  styles: [
    `
    img {
      margin: auto;
    }
    `
  ]
})
export class ImageComponent implements OnInit {
  @Input() src: string;
  imageSrc: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}

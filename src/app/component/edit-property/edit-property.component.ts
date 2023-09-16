import {CommonModule} from '@angular/common';
import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class EditPropertyComponent implements OnInit {

  @Input() targetProperty: string;
  // public template: TemplateRef<any>;
  public titleMap = {
    "name": [
      "Name",
      TemplateRef
    ],
    "nickname": "Display Name",
    "dob": "Date of Birth",
    "sex": "Sex",
    "weight": "Weight",
    "height": "Height"
  };

  constructor(
    private modalCtrl: ModalController,
    // public template: TemplateRef,
  ) {}

  ngOnInit() {
    console.log("targetProperty", this.targetProperty);
    // this.template = document.getElementById(this.targetProperty);
  }

  cancel() {
    console.log("cancel", this.targetProperty);
    this.modalCtrl.dismiss();
  }

  save() {
    console.log("save", this.targetProperty);
    switch (this.targetProperty) {
      case 'name': {
        console.log("save name");
        break;
      }
      case 'nickname': {
        console.log("save nickname");
        break;
      }
      case 'dob': {
        console.log("save dob");
        break;
      }
      default: {
        console.error("save ", this.targetProperty, " unknown");
        break;
      }
    }
    this.modalCtrl.dismiss();
  }

}

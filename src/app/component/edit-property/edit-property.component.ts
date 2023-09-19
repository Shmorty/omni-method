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
  @ViewChild('name') nameTemplate: TemplateRef<any>;
  @ViewChild('nickname') nicknameTemplate: TemplateRef<any>;
  @ViewChild('dob') dobTemplate: TemplateRef<any>;
  @ViewChild('sex') sexTemplate: TemplateRef<any>;
  @ViewChild('weight') weightTemplate: TemplateRef<any>;
  @ViewChild('height') heightTemplate: TemplateRef<any>;
  public title = "loading...";
  public template: TemplateRef<any>;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log("targetProperty", this.targetProperty);
    // this.template = document.getElementById(this.targetProperty);
  }

  ngAfterViewInit() {
    switch (this.targetProperty) {
      case 'name': {
        this.title = "Name";
        this.template = this.nameTemplate;
        break;
      }
      case 'nickname': {
        this.title = "Display Name";
        this.template = this.nicknameTemplate;
        break;
      }
      case 'dob': {
        this.title = "Date of Birth";
        this.template = this.dobTemplate;
        break;
      }
      case 'sex': {
        this.title = "Sex";
        this.template = this.sexTemplate;
        break;
      }
      case 'weight': {
        this.title = "Weight";
        this.template = this.weightTemplate;
        break;
      }
      case 'height': {
        this.title = "Height";
        this.template = this.heightTemplate;
        break;
      }
    }
    console.log("template", this.template);
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
      case 'sex': {
        console.log("save sex");
        break;
      }
      case 'weight': {
        console.log("save weight");
        break;
      }
      case 'height': {
        console.log("save height");
        break;
      }
      default: {
        console.error("save", this.targetProperty, "unknown");
        break;
      }
    }
    this.modalCtrl.dismiss();
  }

}

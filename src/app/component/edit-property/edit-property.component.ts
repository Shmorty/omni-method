import {CommonModule} from '@angular/common';
import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {first} from 'rxjs';
import {User} from 'src/app/store/user/user.model';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class EditPropertyComponent implements OnInit {

  @Input() targetProperty: string;
  @Input() user: User;
  @ViewChild('name') nameTemplate: TemplateRef<any>;
  @ViewChild('nickname') nicknameTemplate: TemplateRef<any>;
  @ViewChild('dob') dobTemplate: TemplateRef<any>;
  @ViewChild('sex') sexTemplate: TemplateRef<any>;
  @ViewChild('weight') weightTemplate: TemplateRef<any>;
  @ViewChild('height') heightTemplate: TemplateRef<any>;
  public title = "loading...";
  public template: TemplateRef<any>;
  public firstName: string;
  public updUser: User;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log("targetProperty", this.targetProperty);
    console.log("user", this.user);
    // this.template = document.getElementById(this.targetProperty);
    this.updUser = JSON.parse(JSON.stringify(this.user));
    console.log("updUser", JSON.stringify(this.updUser));
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
        console.log("firsName", this.updUser.firstName);
        console.log("lastName", this.updUser.lastName);
        break;
      }
      case 'nickname': {
        console.log("nickname", this.updUser.nickname);
        break;
      }
      case 'dob': {
        console.log("dob", this.updUser.dob);
        break;
      }
      case 'sex': {
        console.log("sex", this.updUser.gender);
        break;
      }
      case 'weight': {
        console.log("weight", this.updUser.weight);
        break;
      }
      case 'height': {
        console.log("height", this.updUser.height);
        break;
      }
      default: {
        console.error("save", this.targetProperty, "unknown");
        break;
      }
    }
    this.modalCtrl.dismiss(this.updUser, "save");
  }

}

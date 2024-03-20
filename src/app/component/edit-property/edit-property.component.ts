import {CommonModule} from '@angular/common';
import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {first} from 'rxjs';
import {User} from 'src/app/store/user/user.model';
import {NumberPickerComponent} from '../number-picker/number-picker.component';
import {UserService, usernameMinLength, usernameMaxLength} from '../../services/user/user.service';
import {ShowToastService} from '../../services/show-toast.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NumberPickerComponent,
  ],
})
export class EditPropertyComponent implements OnInit {

  @Input() targetProperty: string;
  @Input() user: User;
  @ViewChild('avatar') avatarTemplate: TemplateRef<any>;
  @ViewChild('name') nameTemplate: TemplateRef<any>;
  @ViewChild('username') usernameTemplate: TemplateRef<any>;
  @ViewChild('dob') dobTemplate: TemplateRef<any>;
  @ViewChild('sex') sexTemplate: TemplateRef<any>;
  @ViewChild('weight') weightTemplate: TemplateRef<any>;
  @ViewChild('height') heightTemplate: TemplateRef<any>;
  public title = "loading...";
  public template: TemplateRef<any>;
  public firstName: string;
  public updUser: User;
  public imageType = "avatar";
  public avatars = [
    {"label": "Deadlift", "icon": "/assets/images/deadlift.png"},
    {"label": "Squat", "icon": "/assets/images/backsquat.png"},
    {"label": "Bench", "icon": "/assets/images/BenchPress.png"},
    {"label": "Weighted Pull-up", "icon": "/assets/images/weightedpullup.png"},
    {"label": "Pushups", "icon": "/assets/images/pushup.png"},
    {"label": "Pullups", "icon": "/assets/images/pull_up.png"},
    {"label": "Squats", "icon": "/assets/images/backsquat.png"},
    {"label": "Long Jump", "icon": "/assets/images/Long_Jump.png"},
    {"label": "Push Press", "icon": "/assets/images/ChestLaunch.png"},
    {"label": "100 meter sprint", "icon": "/assets/images/100metersprint.png"},
    {"label": "Clean", "icon": "/assets/images/powerclean.png"},
    {"label": "Pike", "icon": "/assets/images/toetouch.png"},
    {"label": "Backbend", "icon": "/assets/images/backbend.png"},
    {"label": "Straddle", "icon": "/assets/images/medial_lateral.png"},
    {"label": "1 Hour Run", "icon": "/assets/images/onehourrun.png"},
    {"label": "2 Minute Sprint", "icon": "/assets/images/2minutedistance.png"},
    {"label": "Half Spider Web", "icon": "/assets/images/agility.png"},
    {"label": "Balance Positions", "icon": "/assets/images/Balance.png"},
    {"label": "Coordination Skills", "icon": "/assets/images/Coordination.png"},
  ];

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private showToastService: ShowToastService
  ) {}

  ngOnInit() {
    console.log("targetProperty", this.targetProperty);
    console.log("user", this.user);
    // this.template = document.getElementById(this.targetProperty);
    this.updUser = JSON.parse(JSON.stringify(this.user));
    console.log("updUser", JSON.stringify(this.updUser));
  }

  ngAfterViewInit() {
    switch (this.targetProperty) {
      case 'avatar': {
        this.title = "Avatar";
        this.template = this.avatarTemplate;
        break;
      }
      case 'name': {
        this.title = "Name";
        this.template = this.nameTemplate;
        break;
      }
      case 'username': {
        this.title = "Username";
        this.template = this.usernameTemplate;
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

  getAvatarClass(avatarPath: string): string {
    if (this.user.avatar === avatarPath) {
      return "avatar-selected";
    }
    return "";
  }

  newWeight(val) {
    this.updUser.weight = val;
  }

  cancel() {
    console.log("cancel", this.targetProperty);
    this.modalCtrl.dismiss();
  }

  setAvatar(avatar: string) {
    this.updUser.avatar = avatar;
    this.save();
  }

  async save() {
    console.log("save", this.targetProperty);
    switch (this.targetProperty) {
      case 'name': {
        console.log("firsName", this.updUser.firstName);
        console.log("lastName", this.updUser.lastName);
        break;
      }
      case 'username': {
        if (!this.updUser.username) {
          this.showToastService.showToast("You must select a username", "danger");
          return;
        }
        if (this.updUser.username.length < usernameMinLength) {
          this.showToastService.showToast("Username must be at least " + usernameMinLength + " characters", "danger");
          return;
        }
        if (this.updUser.username.length > usernameMaxLength) {
          this.showToastService.showToast("Username must be no more than " + usernameMaxLength + " characters", "danger");
          return;
        }
        const isAvailable = await this.userService.isUsernameAvailable(this.updUser.username);
        if (!isAvailable) {
          this.showToastService.showToast("Sorry, a user already exists with that username", "danger");
          return;
        }
        console.log("username", this.updUser.username);
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

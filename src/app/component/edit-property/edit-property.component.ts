import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class EditPropertyComponent implements OnInit {

  @Input() targetProperty: string;

  constructor() {}

  ngOnInit() {
    console.log("targetProperty", this.targetProperty);
  }

  cancel() {
    console.log("cancel");
  }

  save() {
    console.log("save");
  }
}

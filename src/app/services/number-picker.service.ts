import {Injectable} from '@angular/core';
import {PickerColumn, PickerColumnOption, PickerController} from '@ionic/angular';
import {User} from '../store/user/user.model';
import {UserService} from './user/user.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumberPickerService {
  private result = new BehaviorSubject({});
  currentValue = this.result.asObservable();

  constructor(
    public userService: UserService,
    private pickerCtrl: PickerController
  ) {}

  async openPicker(user: User, targetProperty: string) {
    const picker = await this.pickerCtrl.create({
      columns: this.generateColumns(user, targetProperty),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            const updUser = JSON.parse(JSON.stringify(user));
            console.log("You selected", value);
            switch (targetProperty) {
              case 'weight': {
                updUser.weight = value['weight'].value;
                break;
              }
              case 'height': {
                updUser.height.feet = value['feet'].value;
                updUser.height.inches = value['inches'].value;
                break;
              }
            }
            console.log("updUser", updUser);
            this.result.next(updUser);
            // this.userService.updateUser(updUser);
          },
        },
      ],
    });

    await picker.present();
  }

  private profileMeta = {
    "weight": [
      {
        name: "weight",
        min: 15,
        max: 325,
        increment: 1,
        units: "lbs",
      }],
    "height": [
      {
        name: "feet",
        min: 3,
        max: 7,
        increment: 1,
        units: "ft",
      },
      {
        name: "inches",
        min: 0,
        max: 11,
        increment: 1,
        units: "in",
      }]
  };

  generateColumns(user: User, targetProperty: string) {
    const pickerColumns: PickerColumn[] = [];
    // const pickerColumnOptions: PickerColumnOption[] = [];
    this.profileMeta[targetProperty].forEach((meta, index) => {
      const valueArray = this.createRange(meta.min, meta.max, meta.increment);
      const pickerColOpt: PickerColumnOption[] = Array.from(valueArray, (num) => {
        return {text: num + " " + meta.units, value: num};
      });
      const column: PickerColumn = {
        name: meta.name,
        options: pickerColOpt
      }
      switch (targetProperty) {
        case 'weight': {
          column.selectedIndex = valueArray.findIndex((w) => w == user.weight);
          break;
        }
        case 'height': {
          column.selectedIndex = valueArray.findIndex((val) => val == (index ? user.height.inches : user.height.feet));
          break;
        }
      }
      pickerColumns.push(column);
    });
    return pickerColumns;
  }

  private createRange(min: number, max: number, increment: number): number[] {
    const len = (max - min) / increment + 1;
    // force integer math avoid floating point issues
    const reciprocal = 1 / increment;
    console.log("number-picker min", min, "max", max, "increment", increment, "reciprocal", reciprocal, "len", len);

    if (Number.isInteger(min) && Number.isInteger(increment)) {
      // console.log("divide index by reciprocal");
      return Array.from(
        {length: len},
        (_, index) => min + index / reciprocal);
    } else {
      // console.log("multiply min by reciprocal");
      return Array.from(
        {length: len},
        (_, index) => (min * reciprocal + index / reciprocal * reciprocal) / reciprocal);
    }
  }

}

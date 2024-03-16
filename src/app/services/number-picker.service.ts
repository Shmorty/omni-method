import {Injectable} from '@angular/core';
import {PickerButton, PickerColumn, PickerColumnOption, PickerController} from '@ionic/angular';
import {User} from '../store/user/user.model';
import {UserService} from './user/user.service';
import {BehaviorSubject} from 'rxjs';
import {Score} from '../store/models/score.model';
import {Assessment} from '../store/assessments/assessment.model';
import {AssessmentService} from './assessments/assessment.service';

@Injectable({
  providedIn: 'root'
})
export class NumberPickerService {
  private result = new BehaviorSubject({});
  public currentValue = this.result.asObservable();

  constructor(
    public userService: UserService,
    private pickerCtrl: PickerController,
    private assessmentService: AssessmentService,
  ) {}

  // pickerButtons(type: string): PickerButton[] {
  //   console.log("pickerButtons " + type);
  //   return [
  //     {
  //       text: 'Cancel',
  //       role: 'cancel',
  //     },
  //     {
  //       text: 'Confirm',
  //       handler: (value) => {
  //         console.log("new score from picker", value);
  //       },
  //     },
  //   ];
  // }

  async openScorePicker(assessment: Assessment, score: Score) {
    // assessment {min, max, increment, entryUnits, label}
    // score {currentWeight, rawScore}
    let columns: PickerColumn[] = [];
    const reverse = this.assessmentService.isReverse(assessment.aid);
    // await this.generateColumn(assessment.min, assessment.max, assessment.increment | 1,
    //   assessment.entryUnits, score.rawScore).then((result) => columns = result);
    columns.push(this.generateColumn(
      assessment.aid,
      assessment.min,
      assessment.max,
      assessment.increment | 1,
      assessment.entryUnits,
      score?.rawScore | (reverse ? assessment.max : assessment.min),
      reverse));
    const picker = await this.pickerCtrl.create({
      columns: columns,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            const updScore = JSON.parse(JSON.stringify(score));
            updScore.rawScore = value[assessment.aid].value;
            this.result.next(updScore);
          },
        },
      ],
      // cssClass: 'inline-picker',
    });
    await picker.present();
  }

  async openWeightPicker(obj: User | Score) {
    const meta = {
      name: "weight",
      min: 15,
      max: 325,
      increment: 1,
      units: "lbs",
      reverse: false,
    };
    console.log("openWeightPicker", obj);
    let pickerColumns: PickerColumn[] = [];

    const column = this.generateColumn(meta.name, meta.min, meta.max,
      meta.increment, meta.units, obj['weight'] | obj['currentWeight'],
      meta.reverse);
    pickerColumns.push(column);

    const picker = await this.pickerCtrl.create({
      columns: pickerColumns,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log("confirm weight", value);
            const newObj = JSON.parse(JSON.stringify(obj));
            if (newObj['weight']) {
              newObj['weight'] = value['weight'].value;
            } else {
              newObj['currentWeight'] = value['weight'].value;
            }
            console.log("newObj", newObj);
            this.result.next(newObj);
          },
        },
      ],
      cssClass: '',
    });
    await picker.present();
  }

  async openHeightPicker(user: User) {
    let pickerColumns: PickerColumn[] = [];

    pickerColumns.push(this.generateColumn("feet", 3, 7, 1, 'ft',
      user.height.feet, false));
    pickerColumns.push(this.generateColumn("inches", 0, 11, 1, 'in',
      user.height.inches, false));

    const picker = await this.pickerCtrl.create({
      columns: pickerColumns,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Confirm',
        handler: (value) => {
          const updUser = JSON.parse(JSON.stringify(user));
          console.log("You selected", value);
          updUser.height.feet = value['feet'].value;
          updUser.height.inches = value['inches'].value;
          console.log("updUser", updUser);
          this.result.next(updUser);
        },
      }],
      cssClass: '',
    });
    await picker.present();
  }

  // async openProfilePicker(user: User, targetProperty: string) {
  //   // edit profile pickers for height and weight
  //   const picker = await this.pickerCtrl.create({
  //     columns: this.generatePickerColumns(user, targetProperty),
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: (value) => {
  //           const updUser = JSON.parse(JSON.stringify(user));
  //           console.log("You selected", value);
  //           switch (targetProperty) {
  //             case 'weight': {
  //               updUser.weight = value['weight'].value;
  //               break;
  //             }
  //             case 'height': {
  //               updUser.height.feet = value['feet'].value;
  //               updUser.height.inches = value['inches'].value;
  //               break;
  //             }
  //           }
  //           console.log("updUser", updUser);
  //           this.result.next(updUser);
  //           // this.userService.updateUser(updUser);
  //         },
  //       },
  //     ],
  //     // cssClass: 'inline-picker',
  //   });
  //   await picker.present();
  // }

  /**
   * Meta data
   */
  //   private profileMeta = {
  //   "weight": [
  //     {
  //       name: "weight",
  //       min: 15,
  //       max: 325,
  //       increment: 1,
  //       units: "lbs",
  //     }],
  //   "height": [
  //     {
  //       name: "feet",
  //       min: 3,
  //       max: 7,
  //       increment: 1,
  //       units: "ft",
  //     },
  //     {
  //       name: "inches",
  //       min: 0,
  //       max: 11,
  //       increment: 1,
  //       units: "in",
  //     }]
  // };

  public generateColumn(name, min, max, increment, units, initialValue, reverse: boolean): PickerColumn {
    console.log("generateColumn min: " + min + " max: " + max + " increment: " + increment
      + " units: " + units + " initialValue: " + initialValue);
    const valueRange = this.createRange(min, max, increment);
    const column: PickerColumn = {
      name: name,
      options: this.createColumnOptions(valueRange, reverse),
      prefix: " ",
      suffix: units,
      selectedIndex: 0,
    };
    column.selectedIndex = valueRange.findIndex((x) => x === initialValue) | 0;
    console.log("generateColumn return", column);
    return column;
  }

  // private generatePickerColumns(user: User, targetProperty: string): PickerColumn[] {
  //   let pickerColumns: PickerColumn[] = [];
  //   // loop through meta data to build picker columns
  //   this.profileMeta[targetProperty].forEach((meta, index) => {
  //     // generate values for picker wheel
  //     const initalValue = this.profileInitialValue(user, targetProperty, index);
  //     const column = this.generateColumn(meta.name, meta.min, meta.max, meta.increment, meta.units, initalValue, false);
  //     pickerColumns.push(column);
  //   });
  //   // return collection
  //   return pickerColumns;
  // }

  // private profileInitialValue(user: User, property: string, index: number): number {
  //   let initialValue = 0;
  //   switch (property) {
  //     case 'weight': {
  //       initialValue = user.weight;
  //       break;
  //     }
  //     case 'height': {
  //       initialValue = (index ? user.height.inches : user.height.feet);
  //       break;
  //     }
  //   }
  //   return initialValue;
  // }

  private createColumnOptions(valueArray: number[], reverse: boolean): PickerColumnOption[] {
    if (reverse) {
      valueArray = valueArray.reverse();
    }
    return Array.from(valueArray, (num) => {
      return {text: num.toString(), value: num};
    });
  }

  /*
   * createRange values for picker wheel
   */
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

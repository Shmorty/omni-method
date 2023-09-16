import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonRouterOutlet, IonicModule} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Assessment} from '../../store/assessments/assessment.model';
import {AssessmentService} from '../../services/assessments/assessment.service';
import {CommonModule} from '@angular/common';
import {Score} from '../../store/models/score.model';

@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class EditChecklistComponent implements OnInit {
  @Input() assessment: Assessment;
  public displayChecked: boolean[] = [];
  @Output() checked = new EventEmitter<boolean[]>();
  public checklist$: Observable<string[]>;
  public assessment$: Observable<Assessment>;
  @Input() scores$: Observable<Score[]>;
  public curScore: Score;
  private checklistChanged: boolean = false;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit() {
    console.log("ngOnInit", this.assessment);
    this.checklist$ = this.assessmentService.getChecklist(this.assessment.aid);
  }

  ngAfterViewInit(): void {
    this.checklist$ = this.assessmentService.getChecklist(this.assessment.aid);
    this.scores$?.subscribe((score) => {
      console.log("score", score);
      if (score.length > 0) {
        // assuming most recent on top or only store one
        this.curScore = score[0];
        this.displayChecked = Array.from(this.curScore.checklist);
        this.checked.emit(this.displayChecked);
      }
    });

  }

  getCheckedItem(item): boolean {
    return this.displayChecked[item];
    // return this.displayChecked ? this.displayChecked[item] : false;
  }

  toggleCheckItem(item) {
    this.displayChecked[item] = !this.displayChecked[item];
    this.checked.emit(this.displayChecked);
    this.checklistChanged = true;
    this.routerOutlet.swipeGesture = false;
    console.log("toggleCheckItem", item, this.displayChecked[item]);
  }

}

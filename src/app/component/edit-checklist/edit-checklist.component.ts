import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonRouterOutlet, IonicModule} from '@ionic/angular';
import {Observable, first, firstValueFrom, take} from 'rxjs';
import {Assessment} from '../../store/assessments/assessment.model';
import {AssessmentService} from '../../services/assessments/assessment.service';
import {CommonModule} from '@angular/common';
import {Score} from '../../store/models/score.model';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class EditChecklistComponent implements OnInit {
  @Input() assessment: Assessment;
  public displayChecked: boolean[] = [];
  @Output() checked = new EventEmitter<boolean[]>();
  public checklist$: Observable<object[]>;
  public checklistCategories$: Observable<string[]>;
  public assessment$: Observable<Assessment>;
  @Input() score$: Observable<Score>;
  public curScore: Score;
  // private checklistChanged: boolean = false;
  public category: string;

  constructor(
    private router: Router,
    private routerOutlet: IonRouterOutlet,
    private assessmentService: AssessmentService
  ) {}

  async ngOnInit() {
    console.log("ngOnInit assessment: ", JSON.stringify(this.assessment));
    this.checklist$ = this.assessmentService.getChecklist(this.assessment.aid);
    // if checklist with categories
    this.checklistCategories$ = this.assessmentService.getChecklistCategories(this.assessment.aid);
    await this.checklistCategories$.pipe(first()).subscribe(val => this.category = val[0]);
    console.log("category " + this.category);
  }

  ngAfterViewInit(): void {
    // get the checklist configuration
    // this.checklist$ = this.assessmentService.getChecklist(this.assessment.aid);
    // get the user's current scoring
    this.score$?.subscribe((score) => {
      this.curScore = score;
      if (this.curScore && this.curScore.checklist) {
        this.displayChecked = Array.from(this.curScore.checklist);
        // this.checked.emit(this.displayChecked);
      }
    });

  }

  getCheckedItem(item): boolean {
    return this.displayChecked[item];
    // return this.displayChecked ? this.displayChecked[item] : false;
  }

  getCheckedClass(item): string {
    return this.displayChecked[item] ? "checked" : "hide-check";
  }

  toggleCheckItem(e, item) {
    e.stopPropagation();
    this.displayChecked[item] = !this.displayChecked[item];
    this.checked.emit(this.displayChecked);
    // this.checklistChanged = true;
    // this.routerOutlet.swipeGesture = false;
    console.log("toggleCheckItem", item, this.displayChecked[item]);
  }

  openSkill(index) {
    console.log("openSkill " + this.assessment.aid + ", skill index " + index);
    this.router.navigate(['/home', 'profile', 'details', 'skill'], {
      queryParams: {aid: this.assessment.aid, skill: index},
    });
  }

}

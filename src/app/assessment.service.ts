import { Injectable } from '@angular/core';
import { Assessment } from './store/models/assessment.model';
import { Category } from './store/models/category.model';
import { DATA } from './mock-assessements';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor() { }

  getAssessments(): Category[] {
    return DATA;
  }
}

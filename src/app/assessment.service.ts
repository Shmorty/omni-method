import { Injectable } from '@angular/core';
import { Assessment, Category } from './assessment';
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

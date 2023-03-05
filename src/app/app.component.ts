import { Component, OnInit } from '@angular/core';
import { AssessmentService } from './api/assessments/assessment.service';
import { UserService } from './api/user/user.service';

// import { GoogleSigninService } from './google-signin.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Omni Method';

  // constructor(private readonly google: GoogleSigninService) {}
  // constructor(private store: Store<AppState>) {}

  constructor(
    private assessmentService: AssessmentService,
    private userService: UserService
  ) {
    console.log('assessmentService.load()');
    assessmentService.load();
  }

  ngOnInit(): void {}
}

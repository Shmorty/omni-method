import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from 'src/app/api/assessments/assessment.service';
import { AuthService } from 'src/app/services/auth.service';
// import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  title = 'Welcome to Omni Method';

  constructor(
    private auth: AuthService,
    // private categoryService: CategoriesService,
    private assessmentService: AssessmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.currentUser().then((usr) => {
      console.log('welcome init got current user');
      console.log(usr);
      // if (usr?.emailVerified) {
      //   this.router.navigate(['/home']);
      // } else {
      //   console.log('welcome init user');
      //   console.log(usr);
      // }
    });
    // this.categoryService.getCategories().subscribe((data) => {
    //   console.log('got categories from state');
    //   console.log(data);
    // });
  }
}

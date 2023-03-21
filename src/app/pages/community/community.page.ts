import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export enum View {
  Rankings = 'Rankings',
  Updates = 'Updates',
  People = 'People',
}
export interface Athlete {
  rank: number;
  name: string;
  score: number;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {
  View = View;
  public view: View = View.Rankings;
  public ranking$: Observable<Athlete[]> = of([
    { rank: 1, name: 'Adam Apple', score: 6578 },
    { rank: 2, name: 'John Ellard', score: 6533 },
    { rank: 3, name: 'Raymond Platteel', score: 6098 },
    { rank: 4, name: 'Steven Cigar', score: 5784 },
    { rank: 5, name: 'Anthony', score: 5267 },
    { rank: 6, name: 'Tom Brady', score: 5233 },
    { rank: 7, name: 'Roger Federer', score: 5001 },
  ]);

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  setView(viewName: View) {
    this.view = viewName;
  }

  viewClass(viewName: View) {
    return this.view === viewName ? 'active' : 'normal';
  }

  logout() {
    this.auth.logout();
  }
}

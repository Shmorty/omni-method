import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  @Input()
  title: String = 'Videos';

  // constructor(private router: Router) {}
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.title = this.router.getCurrentNavigation().extras.state.title;
      }
    });
  }
  ngOnInit() {}

  goBack() {
    this.router.navigate(['/home', 'training']);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  @Input()
  title: String;

  constructor(private router: Router) {}

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/home', 'training']);
  }
}

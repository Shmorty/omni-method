import {CommonModule} from '@angular/common';
import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {Observable} from 'rxjs';
import {User} from '../../store/user/user.model';
import {UserAvatarComponent} from '../user-avatar/user-avatar.component';
import {UserService} from 'src/app/services/user/user.service';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    UserAvatarComponent,
    NgxSkeletonLoaderModule,
    // NgxSkeletonLoaderModule.forRoot({
    //   animation: 'pulse',
    //   appearance: 'line',
    //   theme: {
    //     extendsFromRoot: true,
    //     'margin-bottom': '0px',
    //   },
    // })
  ],
})
export class ProfileHeaderComponent implements OnInit {

  @Input() background: any;
  user$: Observable<User>;

  constructor(
    public userService: UserService,
    public element: ElementRef,
    public renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    console.log("set backgroune", this.background);
    console.log("element", this.element);
    this.renderer.setStyle(this.element.nativeElement, 'background', this.background);
  }

}

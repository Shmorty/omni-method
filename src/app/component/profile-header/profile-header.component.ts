import {CommonModule} from '@angular/common';
import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {Observable} from 'rxjs';
import {User} from '../../store/user/user.model';
import {UserAvatarComponent} from '../user-avatar/user-avatar.component';
import * as UserSelectors from 'src/app/store/user/user.selectors';
import {UserService} from 'src/app/services/user/user.service';
import {Store} from '@ngrx/store';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    UserAvatarComponent,
  ],
})
export class ProfileHeaderComponent implements OnInit {

  @Input() background: any;
  public user$ = this.store.select(UserSelectors.selectUser); //.pipe(delay(5000));

  constructor(
    private store: Store,
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

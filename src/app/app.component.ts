import {Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AssessmentService} from './services/assessments/assessment.service';
import {IonModal, ModalController, Platform} from '@ionic/angular';
import {TextZoom} from '@capacitor/text-zoom';
import {App} from '@capacitor/app';
import {Network} from '@capacitor/network';
import {PluginListenerHandle} from '@capacitor/core';
import {register} from 'swiper/element/bundle';

// import { GoogleSigninService } from './google-signin.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;
  title = 'Omni Method';
  networkListener: PluginListenerHandle;
  connected: boolean;

  // constructor(private readonly google: GoogleSigninService) {}
  // constructor(private store: Store<AppState>) {}

  constructor(
    private assessmentService: AssessmentService,
    public platform: Platform,
    private ngZone: NgZone
  ) {
    App.addListener('appStateChange', ({isActive}) => {
      TextZoom.getPreferred().then(value => {
        TextZoom.set(value);
      })
    });
    this.assessmentService.load();
    this.initializeApp();
  }

  ngOnInit(): void {
    this.startListeningToNetworkStatus();
  }

  ngOnDestroy(): void {
    this.stopListeningToNetworkStatus();
  }

  initializeApp() {}

  statusChanged(status) {
    this.connected = status.connected;
    if (!this.connected) {
      this.stopListeningToNetworkStatus();
    }
  }

  async startListeningToNetworkStatus() {
    // initialize Network status
    this.networkListener = Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.ngZone.run(() => {
        this.statusChanged(status);
      })
    });

    const status = await Network.getStatus();
    console.log("Network status", status);
    this.statusChanged(status);
    console.log("Network status", this.connected);
  }

  stopListeningToNetworkStatus() {
    if (this.networkListener) {
      this.networkListener.remove();
    }
  }

}

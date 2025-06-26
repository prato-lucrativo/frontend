// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AdmobService } from './services/admob.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private interstitialShown = false;

  constructor(private admob: AdmobService) {}

  async ngOnInit() {
    await this.admob.init();

    if (!this.interstitialShown) {
      this.interstitialShown = true;
      await this.admob.showInterstitial();
    }
  }
}

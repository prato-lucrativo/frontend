import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  AdMob,
  AdOptions,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize, // ✅ substituto correto
} from '@capacitor-community/admob';


@Injectable({ providedIn: 'root' })
export class AdmobService {
  constructor(private platform: Platform) {}

  async init() {
    await this.platform.ready();
    await AdMob.initialize();
  }

  async showBanner() {
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-8061312064375537/2070432398', // ID de teste
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
    };

    await AdMob.showBanner(options);
  }

  async showInterstitial() {
    const options: AdOptions = {
      adId: 'ca-app-pub-8061312064375537/8703289358',
    };

    await AdMob.prepareInterstitial(options); // prepara com config
    await AdMob.showInterstitial();           // exibe sem parâmetros
  }

  async showRewarded() {
    const options: AdOptions = {
      adId: 'ca-app-pub-8061312064375537/4646841880',
    };

    await AdMob.prepareRewardVideoAd(options); // prepara o rewarded
    await AdMob.showRewardVideoAd();           // exibe sem argumentos
  }

  async hideBanner() {
  await AdMob.hideBanner();
}

}

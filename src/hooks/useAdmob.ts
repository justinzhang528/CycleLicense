const Interstitial_Id = 'ca-app-pub-3940256099942544/1033173712';
const Rewarded_Id= 'ca-app-pub-3940256099942544/5224354917';
const FixedSizeBanner_Id =	'ca-app-pub-3940256099942544/6300978111';

import {
    AdMob,
    AdOptions,
    RewardAdOptions,
    BannerAdOptions,
    BannerAdPosition,
    BannerAdSize,
} from '@capacitor-community/admob';

export default function () {
    const showBanner = async () => {
        if (localStorage.getItem('isAdsFree') === 'true') {
            return;
        }
        const options: BannerAdOptions = {
            adId: FixedSizeBanner_Id, // demo ad unit id,
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            isTesting: true,
        };
        await AdMob.showBanner(options);
    };

    const showInterstitial = async () => {
        if (localStorage.getItem('isAdsFree') === 'true') {
            return;
        }
        AdMob.hideBanner();
        const options: AdOptions = {
            adId: Interstitial_Id, // demo ad unit id
            isTesting: true,
        };
        await AdMob.prepareInterstitial(options);
        await AdMob.showInterstitial();
    };

    const showRewardVideo = async () => {
        if (localStorage.getItem('isAdsFree') === 'true') {
            return;
        }
        AdMob.hideBanner();
        const options: RewardAdOptions = {
            adId: Rewarded_Id, // demo ad unit id
            isTesting: true,
        };
        await AdMob.prepareRewardVideoAd(options);
        await AdMob.showRewardVideoAd();
    };

    const resumeBanner = () => {
        AdMob.resumeBanner();
    }

    const initializeAdmob = async function initialize(): Promise<void> {
        await AdMob.initialize();

        const [trackingInfo, consentInfo] = await Promise.all([
            AdMob.trackingAuthorizationStatus(),
            AdMob.requestConsentInfo(),
        ]);

        if (trackingInfo.status === 'notDetermined') {
            /**
             * If you want to explain TrackingAuthorization before showing the iOS dialog,
             * you can show the modal here.
             * ex)
             * const modal = await this.modalCtrl.create({
             *   component: RequestTrackingPage,
             * });
             * await modal.present();
             * await modal.onDidDismiss();  // Wait for close modal
             **/

            await AdMob.requestTrackingAuthorization();
        }

        const authorizationStatus = await AdMob.trackingAuthorizationStatus();
        if (
            authorizationStatus.status === 'authorized'
            && consentInfo.isConsentFormAvailable
            // && consentInfo.status === AdmobConsentStatus.REQUIRED
        ) {
            await AdMob.showConsentForm();
        }
    }

    return {
        showBanner,
        showInterstitial,
        showRewardVideo,
        resumeBanner,
        initializeAdmob
    }
}
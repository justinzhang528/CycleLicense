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

    const initializeAdmob = async ()=> {
        await AdMob.initialize({
            requestTrackingAuthorization: true,
            initializeForTesting: true,
        });
    }

    return {
        showBanner,
        showInterstitial,
        showRewardVideo,
        resumeBanner,
        initializeAdmob
    }
}
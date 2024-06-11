const Interstitial_Id_ios = 'ca-app-pub-1270058413624237/7646744397';
const Interstitial_Id_android = 'ca-app-pub-1270058413624237/3308243822';
const Interstitial_Id_testing = 'ca-app-pub-3940256099942544/1033173712';
const Rewarded_Id_ios= 'ca-app-pub-1270058413624237/8311877231';
const Rewarded_Id_android= 'ca-app-pub-1270058413624237/8503448927';
const Rewarded_Id_testing= 'ca-app-pub-3940256099942544/5224354917';
const FixedSizeBanner_Id_ios =	'';
const FixedSizeBanner_Id_android =	'';
const FixedSizeBanner_Id_testing =	'ca-app-pub-3940256099942544/6300978111';

const isTesting = true;

import {isPlatform} from "@ionic/vue";
import {
    AdMob,
    AdOptions,
    RewardAdOptions,
    BannerAdOptions,
    BannerAdPosition,
    BannerAdSize, RewardAdPluginEvents,
} from '@capacitor-community/admob';

let listener =  AdMob.addListener(RewardAdPluginEvents.Rewarded, ()=>{});

export default function () {
    const showBanner = async () => {
        const options: BannerAdOptions = {
            adId: isTesting ? FixedSizeBanner_Id_testing : isPlatform('ios') ? FixedSizeBanner_Id_ios : FixedSizeBanner_Id_android,
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            isTesting: isTesting,
        };
        await AdMob.showBanner(options);
        if (localStorage.getItem('isUnlimited') === 'true') {
            await AdMob.hideBanner();
        }
    };

    const showInterstitial = async () => {
        const options: AdOptions = {
            adId: isTesting ? FixedSizeBanner_Id_testing : isPlatform('ios') ? Interstitial_Id_ios : Interstitial_Id_android,
            isTesting: isTesting,
        };
        await AdMob.prepareInterstitial(options);

        if (localStorage.getItem('isUnlimited') !== 'true') {
            await AdMob.showInterstitial();
        }
    };

    const showRewardVideo = async (func: any) => {
        await listener.remove();
        listener = AdMob.addListener(RewardAdPluginEvents.Rewarded, func);

        const options: RewardAdOptions = {
            adId: isTesting ? FixedSizeBanner_Id_testing : isPlatform('ios') ? Rewarded_Id_ios : Rewarded_Id_android,
            isTesting: isTesting,
        };
        await AdMob.prepareRewardVideoAd(options);
        if (localStorage.getItem('isUnlimited') !== 'true') {
            await AdMob.showRewardVideoAd();
        }
    };

    const addListenerForRewarded = (func: any) => {
        AdMob.addListener(RewardAdPluginEvents.Rewarded, func);
    }

    const resumeBanner = () => {
        AdMob.resumeBanner();
    }

    const hideBanner = () => {
        AdMob.hideBanner();
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
        hideBanner,
        resumeBanner,
        initializeAdmob
    }
}
const Interstitial_Id = 'ca-app-pub-3940256099942544/1033173712';
const Rewarded_Id= 'ca-app-pub-3940256099942544/5224354917';
const FixedSizeBanner_Id =	'ca-app-pub-3940256099942544/6300978111';

import {
    AdMob,
    AdOptions,
    RewardAdOptions,
    BannerAdOptions,
    BannerAdPosition,
    BannerAdSize, RewardAdPluginEvents,
} from '@capacitor-community/admob';
import useData from "@/hooks/useData";

const {life} = useData();

export default function () {
    const showBanner = async () => {
        const options: BannerAdOptions = {
            adId: FixedSizeBanner_Id, // demo ad unit id,
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            isTesting: true,
        };
        await AdMob.showBanner(options);
        if (localStorage.getItem('isUnlimited') === 'true') {
            await AdMob.hideBanner();
        }
    };

    const showInterstitial = async () => {
        const options: AdOptions = {
            adId: Interstitial_Id, // demo ad unit id
            isTesting: true,
        };
        await AdMob.prepareInterstitial(options);

        if (localStorage.getItem('isUnlimited') !== 'true') {
            await AdMob.showInterstitial();
        }
    };

    const showRewardVideo = async (func: any) => {
        AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
            // Subscribe user rewarded
            func();
        });
        const options: RewardAdOptions = {
            adId: Rewarded_Id, // demo ad unit id
            isTesting: true,
        };
        await AdMob.prepareRewardVideoAd(options);
        if (localStorage.getItem('isUnlimited') !== 'true') {
            await AdMob.showRewardVideoAd();
        }
    };

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
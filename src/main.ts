import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

import {IonicVue} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

import en from '@/locales/en.json'
import mm from '@/locales/mm.json'
import zh_cn from '@/locales/zh_cn.json'
import zh_tw from '@/locales/zh_tw.json'
import {createI18n} from "vue-i18n";
import {ScreenOrientation} from "@capacitor/screen-orientation";
import useAdmob from '@/hooks/useAdmob';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import VueVirtualScroller from 'vue-virtual-scroller';
import useFireBase from "@/hooks/useFirebase";
import UseData from "@/hooks/useData";
import useData from "@/hooks/useData";

const app = createApp(App)
    .use(IonicVue)
    .use(router)

router.isReady().then(() => {
    const i18n = createI18n({
        locale: navigator.language,
        messages: {en, mm, zh_cn, zh_tw},
        legacy: false
    })
    const {initializeAdmob} = useAdmob();
    initializeAdmob();

    const {initializeFirebase} = useFireBase();
    initializeFirebase();

    // initialize local storage:
    if(!localStorage.getItem('currentLife')){
        localStorage.setItem('currentLife', UseData().DEFAULT_LIFE.toString());
    }
    if(!localStorage.getItem('latestIncreaseLifeTime')){
        localStorage.setItem('latestIncreaseLifeTime', new Date().getTime().toString())
    }

    const increaseLife = ()=>{
        setInterval(()=>{
            const currentTime = new Date().getTime();
            const latestIncreaseLifeTime = parseInt(localStorage.getItem('latestIncreaseLifeTime') || '0');
            if(currentTime - latestIncreaseLifeTime >= UseData().DEFAULT_LIFE_INCREASE_INTERVAL){
                const currentLife = parseInt(localStorage.getItem('currentLife') || '0');
                if(currentLife < UseData().DEFAULT_LIFE){
                    localStorage.setItem('currentLife', (currentLife + 1).toString());
                }
                localStorage.setItem('latestIncreaseLifeTime', currentTime.toString());
            }
        }, 300000);
    }

    increaseLife();

    ScreenOrientation.lock({orientation: 'portrait'});

    app.use(i18n);
    app.use(VueVirtualScroller);
    app.mount('#app');
});

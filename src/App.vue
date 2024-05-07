<template>
  <ion-app>
    <ion-router-outlet/>
    <ion-nav :root="homePage"></ion-nav>
    <SideMenu/>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  IonNav,
} from '@ionic/vue';
import HomePage from "@/views/HomePage.vue";
import {markRaw, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import useInternetConnection from "@/hooks/useInternetConnection";
import {showAlert} from "@/hooks/useUtils";
import scheduleNotification from "@/hooks/useLocalNotification";
import SideMenu from "@/views/SideMenu.vue";

const {isOnline} = useInternetConnection();
const {t,locale} = useI18n();
const homePage = markRaw(HomePage)

const checkInternetConnection = ()=> {
  if(!isOnline.value){
    showAlert(t('noInternet'),t('pleaseCheckYourInternetConnection'),'',t('ok'));
  }
}

onMounted(()=> {
  locale.value = localStorage.getItem("currentLanguage") || 'en';
  setInterval(checkInternetConnection, 5000);
  scheduleNotification(t('drivingLicense'),t('timeToStudy'));
});
</script>

<style>
  ion-thumbnail {
    --size: 40px;
  }
</style>
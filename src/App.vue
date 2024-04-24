<template>
  <ion-app>
    <ion-router-outlet/>
    <ion-nav :root="homePage"></ion-nav>
    <IonMenu content-id="menu">
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonIcon :icon="settings"></IonIcon>
            <IonTitle>{{ $t('settings') }}</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonList>
          <IonItem>
            <IonThumbnail slot="start">
              <IonImg src="images/lang.png" alt="avatar"></IonImg>
            </IonThumbnail>
            <IonLabel>{{ $t('language') }}</IonLabel>
            <IonSelect aria-label="Language" interface="popover" :value="currentSelectedLanguageValue" @ionChange="onSelectedLanguageChange" style="padding-left: 20px">
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="mm">မြန်မာ</IonSelectOption>
              <IonSelectOption value="zh_cn">简体中文</IonSelectOption>
              <IonSelectOption value="zh_tw">繁體中文</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonThumbnail slot="start">
              <IonImg src="images/testing.png" alt="avatar"></IonImg>
            </IonThumbnail>
            <IonLabel>{{ $t('mockTest') }}</IonLabel>
            <IonButton style="width: 40%;" shape="round" color="dark">{{$t('settings')}}</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  IonNav,
  IonContent,
  IonTitle,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonSelectOption,
  IonSelect,
  IonLabel,
  IonImg,
  IonList,
  IonItem,
  IonThumbnail,
  IonButton,
  IonIcon
} from '@ionic/vue';
import HomePage from "@/views/HomePage.vue";
import {markRaw, ref} from "vue";import {useI18n} from "vue-i18n";
import {settings} from "ionicons/icons";

const {locale} = useI18n();

const currentSelectedLanguageValue = ref(localStorage.getItem('currentLanguage') || 'en');
const onSelectedLanguageChange = (e: CustomEvent)=>{
  currentSelectedLanguageValue.value = e.detail.value;
  if(currentSelectedLanguageValue.value == 'en')
    locale.value = 'en'
  else if(currentSelectedLanguageValue.value == 'mm')
    locale.value = 'mm';
  else if(currentSelectedLanguageValue.value == 'zh_cn')
    locale.value = 'zh_cn';
  else if(currentSelectedLanguageValue.value == 'zh_tw')
    locale.value = 'zh_tw';
  localStorage.setItem('currentLanguage',currentSelectedLanguageValue.value);
}

const homePage = markRaw(HomePage)

locale.value = localStorage.getItem("currentLanguage") || 'en';
</script>

<style>
  ion-thumbnail {
    --size: 40px;
  }
</style>
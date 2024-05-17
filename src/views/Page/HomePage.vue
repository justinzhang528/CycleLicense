<template>
  <IonPage id="menu">
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="end">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle class="center">{{$t('cycleLicense')}}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <img :src="'images/main.png'" alt="main" style="width: 75%; display: block; margin: 10px auto;">
      <IonList lines="inset">
        <IonItem style="display: flex">
          <IonCard style="width: 65%; box-shadow: none">
            <IonCardHeader>
              <IonCardTitle style="font-size: x-large">{{$t('study')}}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{{$t('studyDescription')}}</IonCardContent>
          </IonCard>
          <IonButton @click="checkLoginStatus(studyPage)" shape="round" size="default" style="font-size: small" color="dark">{{$t('enter')}}</IonButton>
        </IonItem>
        <IonItem>
          <IonCard style="width: 65%; box-shadow: none">
            <IonCardHeader>
              <IonCardTitle style="font-size: x-large">{{$t('mockTest')}}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{{$t('mockTestDescription')}}</IonCardContent>
          </IonCard>
          <IonButton @click="checkLoginStatus(mockTestPage)" shape="round" size="default" style="font-size: small;" color="dark">{{$t('enter')}}</IonButton>
        </IonItem>
        <IonItem v-for="ad in ads" class="image-container" lines="none" style="width: 90%; display: block; margin: 10px auto;">
          <img class="auto-zoom-image" :src="ad.imgUrl" alt="banner" @click="onClickAdsBanner(ad.link)">
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonMenuButton,
  IonButtons,
  menuController,
} from '@ionic/vue';
import StudyPage from "@/views/Page/StudyPage.vue";
import {markRaw, onMounted, ref} from "vue";
import MockTestPage from "@/views/Page/MockTestPage.vue";
import {showToast} from "@/hooks/useUtils";
import {useI18n} from "vue-i18n";
import '@ionic/core/css/ionic.bundle.css';
import useFirebase from "@/hooks/useFirebase";
import useAdmob from "@/hooks/useAdmob";

const { t } = useI18n();
const {handleOnDBValueChange, getAds} = useFirebase();
const ads = ref({});
const studyPage = markRaw(StudyPage)
const mockTestPage = markRaw(MockTestPage)

const checkLoginStatus = (page: any) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  if (!userInfo.name) {
    showToast(t('pleaseLoginFirst'),1500);
    menuController.open('menu');
  }else {
    const nav = document.querySelector('ion-nav');
    nav?.push(page);
  }
}

const onClickAdsBanner = (link: string) => {
  const openLink = ()=>{
    window.open(link);
  }
  if (localStorage.getItem('isUnlimited') !== 'true')
    useAdmob().showRewardVideo(openLink);
  else
    openLink();
}

const getHomeAds = () => {
  getAds('HomeAds','').then((res) => {
    ads.value = res.data;
  });
}

onMounted(()=>{
  handleOnDBValueChange('HomeAds', getHomeAds);
});
</script>

<style scoped>
.auto-zoom-image {
  width: 100%;
  animation: zoom 1s infinite alternate; /* 定义动画效果 */
}

@keyframes zoom {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>

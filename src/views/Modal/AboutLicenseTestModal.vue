<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">{{ $t('aboutLicenseTest') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
    <img alt="notice" :src="'images/noticeInformation.png'" style="width: 80%">
    <IonItem>
      <IonThumbnail slot="start">
        <img alt="testRules" :src="'images/icon/testRulesIcon.png'">
      </IonThumbnail>
      <IonButton @click="onClickTestNotice" fill="clear" color="dark" size="default">{{$t('testRules')}}</IonButton>
    </IonItem>
    <IonItem>
      <IonThumbnail slot="start">
        <img alt="testRules" style="height: 80%;width: 80%" :src="'images/icon/motorService.png'">
      </IonThumbnail>
      <IonButton @click="onClickOpenLink('https://www.mvdis.gov.tw/m3-simulator-drv/index.zul')" fill="clear" color="dark" size="default">{{$t('onlineTest')}}</IonButton>
    </IonItem>
    <IonItem>
      <IonThumbnail slot="start">
        <img alt="testRules" style="height: 80%;width: 80%" :src="'images/icon/motorService.png'">
      </IonThumbnail>
      <IonButton @click="onClickOpenLink('https://www.mvdis.gov.tw/m3-emv-trn/exm/locations#gsc.tab=0')" fill="clear" color="dark" size="default">{{$t('applyTest')}}</IonButton>
    </IonItem>
    <IonItem>
      <IonThumbnail slot="start">
        <img alt="testRules" style="height: 80%;width: 80%" :src="'images/icon/youtube.png'">
      </IonThumbnail>
      <IonButton @click="onClickOpenLink('youtube.com/watch?v=Xg3Ahg6qH10&t')" fill="clear" color="dark" size="default">{{$t('tutorialVideo')}}</IonButton>
    </IonItem>
<!--    <IonItem>-->
<!--      <IonThumbnail slot="start">-->
<!--        <img alt="ads" :src="'images/icon/adsIcon.png'">-->
<!--      </IonThumbnail>-->
<!--      <IonButton @click="onClickAds" fill="clear" color="dark" size="default">{{$t('ads')}}</IonButton>-->
<!--    </IonItem>-->
  </IonContent>
  <IonButton class="ion-padding ion-align-self-center" @click="onCancelAboutLicenseTestModal" color="dark" size="small" shape="round">{{$t('close')}}</IonButton>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import TestNoticeModal from "@/views/Modal/TestRulesModal.vue";
import AdsModal from "@/views/Modal/AdsModal.vue";
import useAdmob from "@/hooks/useAdmob";

const onCancelAboutLicenseTestModal = () => {
  modalController.dismiss(null, 'cancel');
}

const onClickTestNotice = async () => {
  const modal = await modalController.create({
    component: TestNoticeModal,
  });

  modal.present();
}

const onClickAds = async () => {
  const modal = await modalController.create({
    component: AdsModal,
  });

  modal.present();
}

const onClickOpenLink = (link: string) => {
  const openLink = ()=>{
    window.open(link);
  }
  if (localStorage.getItem('isUnlimited') !== 'true')
    useAdmob().showRewardVideo(openLink);
  else
    openLink();
}
</script>

<style scoped>

</style>
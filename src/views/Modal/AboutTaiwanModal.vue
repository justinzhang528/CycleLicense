<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">{{ $t('aboutTaiwan') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
    <img alt="notice" :src="'images/noticeInformation.png'" style="width: 80%">
    <IonItem>
      <IonThumbnail slot="start">
        <img alt="testRules" :src="'images/icon/testRulesIcon.png'">
      </IonThumbnail>
      <IonButton @click="onClickTestNotice" fill="clear" color="dark" size="default" style="text-decoration: underline">{{$t('testRules')}}</IonButton>
    </IonItem>
    <IonItem>
      <IonThumbnail slot="start">
        <img alt="ads" :src="'images/icon/adsIcon.png'">
      </IonThumbnail>
      <IonButton @click="onClickAds" fill="clear" color="dark" size="default" style="text-decoration: underline">{{$t('ads')}}</IonButton>
    </IonItem>
  </IonContent>
  <IonButton class="ion-padding ion-align-self-center" @click="onCancelAboutTaiwanModal" color="dark" size="small" shape="round">{{$t('close')}}</IonButton>
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

const onCancelAboutTaiwanModal = () => {
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
</script>

<style scoped>

</style>
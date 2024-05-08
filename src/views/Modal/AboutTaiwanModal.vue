<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton @click="onCancelAboutTaiwanModal">{{ $t('close') }}</IonButton>
      </IonButtons>
      <IonTitle class="center">{{ $t('aboutTaiwan') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
    <img alt="notice" :src="'images/noticeInformation.png'" style="width: 80%">
    <IonItem button detail lines="none" class="ion-item-border" @click="onClickTestNotice">
      <IonThumbnail slot="start">
        <img alt="language" :src="'images/icon/testRulesIcon.png'">
      </IonThumbnail>
      <IonLabel style="padding-left: 10px">{{$t('testRules')}}</IonLabel>
    </IonItem>
  </IonContent>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem, IonLabel,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import TestNoticeModal from "@/views/Modal/TestRulesModal.vue";

const onCancelAboutTaiwanModal = () => {
  modalController.dismiss(null, 'cancel');
}

const onClickTestNotice = async () => {
  const modal = await modalController.create({
    component: TestNoticeModal,
  });

  modal.present();
}
</script>

<style scoped>

</style>
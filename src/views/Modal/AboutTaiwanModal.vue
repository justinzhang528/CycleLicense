<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton @click="onCancelAboutTaiwanModal">{{ $t('cancel') }}</IonButton>
      </IonButtons>
      <IonTitle class="center">{{ $t('aboutTaiwan') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
    <img alt="notice" :src="'images/noticeInformation.png'" style="width: 80%">
    <IonItem>

    </IonItem>
  </IonContent>
</template>

<script setup lang="ts">
import {IonButton, IonButtons, IonContent, IonHeader, IonItem, IonTitle, IonToolbar, modalController} from "@ionic/vue";

const onCancelAboutTaiwanModal = () => {
  modalController.dismiss(null, 'cancel');
}
</script>

<style scoped>

</style>
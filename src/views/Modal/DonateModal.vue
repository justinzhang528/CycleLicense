<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton @click="onCancelDonateModal">{{ $t('cancel') }}</IonButton>
      </IonButtons>
      <IonTitle class="center">{{ $t('donate') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
    <img alt="donate" :src="'images/donate.png'" style="width: 60%">
    <IonItem>
      <IonButton href="https://www.facebook.com/">test</IonButton>
    </IonItem>
  </IonContent>
</template>

<script setup lang="ts">
import {IonButton, IonButtons, IonContent, IonHeader, IonItem, IonTitle, IonToolbar, modalController} from "@ionic/vue"

const onCancelDonateModal = () => {
  modalController.dismiss(null, 'cancel')
}
</script>

<style scoped>

</style>
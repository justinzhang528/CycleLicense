<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">{{ $t('ads') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
    <IonGrid>
      <IonRow class="ion-padding">
        <a href="https://neilpatel.com/blog/banner-advertising/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn1L_ruDNpPrMHUG--qitWcSH_xsUFjJUprQ&s" alt="banner1">
        </a>
      </IonRow>
      <IonRow class="ion-padding">
        <a href="https://smartblogger.com/banner-ads/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLetqlty-nvFnM5TSMyFB58pyQ_nzm-Phnng&s" alt="banner2">
        </a>
      </IonRow>
    </IonGrid>
  </IonContent>
  <IonButton class="ion-padding ion-align-self-center" @click="onCancelAdsModal" color="dark" size="small" shape="round">{{$t('close')}}</IonButton>
</template>

<script setup lang="ts">
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar, modalController, IonGrid, IonRow} from "@ionic/vue"

const onCancelAdsModal = () => {
  modalController.dismiss(null, 'cancel')
}
</script>

<style scoped>
ion-grid {
  --ion-grid-columns: 10;
}
</style>
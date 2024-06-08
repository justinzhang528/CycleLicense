<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">{{ $t('admin') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
    <IonItem>
      <IonThumbnail slot="start">
        <img alt="testRules" :src="'images/icon/userManagementIcon.png'">
      </IonThumbnail>
      <IonButton @click="onClickUserManagement" fill="clear" color="dark" size="default">{{$t('userManagement')}}</IonButton>
    </IonItem>
    <IonItem>
      <IonThumbnail slot="start">
        <img alt="ads" :src="'images/icon/adsManagementIcon.png'">
      </IonThumbnail>
      <IonButton @click="onClickAdsManagement" fill="clear" color="dark" size="default">{{$t('adsManagement')}}</IonButton>
    </IonItem>
  </IonContent>
  <IonButton class="ion-padding ion-align-self-center" @click="onCancelAdminModal" color="dark" size="small" shape="round">{{$t('close')}}</IonButton>
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
import UserManagementModal from "@/views/Modal/UserManagementModal.vue";
import AdsManagementModal from "@/views/Modal/AdsManagementModal.vue";

const onCancelAdminModal = () => {
  modalController.dismiss(null, 'cancel');
}

const onClickUserManagement = async () => {
  const modal = await modalController.create({
    component: UserManagementModal,
  });

  modal.present();
}

const onClickAdsManagement = async () => {
  const modal = await modalController.create({
    component: AdsManagementModal,
  });

  modal.present();
}
</script>

<style scoped>

</style>
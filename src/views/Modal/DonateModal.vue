<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">{{ $t('donate') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
    <img alt="donate" :src="'images/donate.png'" style="width: 60%">
    <IonItem>
      <IonButton fill="clear" href="https://www.facebook.com">
        <IonThumbnail>
          <img alt="fb" :src="'images/icon/fbIcon.png'">
        </IonThumbnail>
      </IonButton>
    </IonItem>
    <IonItem>
      <IonButton fill="clear" href="https://m.me/100010139531439?hash=AbbqmXBPU56TvjwQ">
        <IonThumbnail>
          <img alt="messenger" :src="'images/icon/messengerIcon.png'">
        </IonThumbnail>
      </IonButton>
    </IonItem>
    <IonItem>
      <IonButton fill="clear" href="https://line.me/ti/p/e7T1R-XuQa">
        <IonThumbnail>
          <img alt="line" :src="'images/icon/lineIcon.png'">
        </IonThumbnail>
      </IonButton>
    </IonItem>
  </IonContent>
  <IonButton class="ion-padding ion-align-self-center" @click="onCancelDonateModal" color="dark" size="small" shape="round">{{$t('close')}}</IonButton>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
  modalController,
  IonIcon,
  IonThumbnail
} from "@ionic/vue"
import {logoFacebook} from "ionicons/icons";

const onCancelDonateModal = () => {
  modalController.dismiss(null, 'cancel')
}
</script>

<style scoped>

</style>
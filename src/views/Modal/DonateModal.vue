<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">{{ $t('donate') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
<!--    <img alt="donate" :src="'images/donate.png'" style="width: 40%">-->
    <IonGrid class="ion-text-left">
      <IonRow>
        <IonLabel>{{$t('donate-1')}}</IonLabel>
      </IonRow>
      <IonRow>
        <IonLabel style="font-weight: bold; padding-left: 10px" color="danger">{{$t('donate-2')}}</IonLabel>
      </IonRow>
      <IonRow>
        <IonLabel  style="font-weight: bold; padding-left: 10px" color="danger">{{$t('donate-3')}}</IonLabel>
      </IonRow><br>
      <IonRow>
        <IonLabel>{{$t('donate-4')}}</IonLabel>
      </IonRow>
      <IonRow>
        <IonLabel style="font-weight: bold; padding-left: 10px">{{$t('donate-5')}}</IonLabel>
        <span class="ion-text-center ion-padding">
          <img alt="messenger" src="https://hackmd.io/_uploads/BJBuh71mC.png" style="width: 40%">
        </span>
      </IonRow>
      <IonRow>
        <IonLabel style="font-weight: bold; padding-left: 10px">{{$t('donate-6')}}</IonLabel>
        <span class="center">
          <IonButton fill="clear" href="https://m.me/100010139531439?hash=AbbqmXBPU56TvjwQ">
            <IonThumbnail>
              <img alt="messenger" :src="'images/icon/messengerIcon.png'">
            </IonThumbnail>
          </IonButton>
          <IonButton fill="clear" href="https://line.me/ti/p/e7T1R-XuQa">
            <IonThumbnail>
              <img alt="line" :src="'images/icon/lineIcon.png'">
            </IonThumbnail>
          </IonButton>
        </span>
      </IonRow>
      <IonRow>
        <IonLabel style="text-decoration: underline;">{{$t('donate-7')}}</IonLabel>
      </IonRow><br>
      <IonRow class="ion-justify-content-center">
        <IonLabel color="danger" style="font-weight: bold; font-size: larger">{{$t('donate-8')}}</IonLabel>
      </IonRow>
    </IonGrid>
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
  IonThumbnail, IonLabel, IonRow, IonGrid, IonCol
} from "@ionic/vue"
import {logoFacebook} from "ionicons/icons";

const onCancelDonateModal = () => {
  modalController.dismiss(null, 'cancel')
}
</script>

<style scoped>

</style>
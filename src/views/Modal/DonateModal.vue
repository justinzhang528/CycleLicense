<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">{{ $t('donate') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
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
          <img alt="messenger" :src="line.qrCodeImgUrl" style="width: 40%">
        </span>
      </IonRow>
      <IonRow>
        <IonLabel style="font-weight: bold; padding-left: 10px">{{$t('donate-6')}}</IonLabel>
        <span class="center">
          <IonButton fill="clear" :href="messenger.link">
            <IonThumbnail>
              <img alt="messenger" :src="'images/icon/messengerIcon.png'">
            </IonThumbnail>
          </IonButton>
          <IonButton fill="clear" :href="line.link">
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
  IonTitle,
  IonToolbar,
  modalController,
  IonThumbnail, IonLabel, IonRow, IonGrid
} from "@ionic/vue"
import {onMounted, ref} from "vue";
import useFirebase from "@/hooks/useFirebase";

const {getAppSetting} = useFirebase();
const line = ref({});
const messenger = ref({});
const onCancelDonateModal = () => {
  modalController.dismiss(null, 'cancel')
}

onMounted(()=>{
  getAppSetting('').then((res)=>{
    line.value = res.data.line;
    messenger.value = res.data.messenger;
  })
})
</script>

<style scoped>

</style>
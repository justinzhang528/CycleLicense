<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">{{ $t('ads') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center">
    <IonRefresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
      <IonRefresherContent>
      </IonRefresherContent>
    </IonRefresher>
    <IonGrid>
      <IonItem v-for="ad in ads" lines="full">
        <IonRow class="ion-padding ion-justify-content-center">
          <IonLabel class="ion-padding-bottom" style="font-weight: bold;text-decoration: underline">{{ad.name}}</IonLabel><br>
          <span style="position: relative;justify-content: center;align-items: center;display: flex">
            <img :src="ad.imgUrl" alt="banner1" style="position: relative;z-index: 1;opacity: 0.75">
            <IonButton color="dark" style="position: absolute;z-index: 2;opacity: 0.85;" @click="onClickAdsBanner(ad.link)">{{$t('readMore')}}<IonIcon :icon="chevronForwardOutline" slot="end" class="ion-no-padding"></IonIcon></IonButton>
          </span>
          <IonLabel>{{ad.description}}</IonLabel>
        </IonRow>
      </IonItem>
    </IonGrid>
  </IonContent>
  <IonButton class="ion-padding ion-align-self-center" @click="onCancelAdsModal" color="dark" size="small" shape="round">{{$t('close')}}</IonButton>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  modalController,
  IonGrid,
  IonRow,
  IonLabel,
  IonItem,
  IonRefresher, IonRefresherContent,
  IonIcon,
} from "@ionic/vue"
import useFirebase from "@/hooks/useFirebase";
import {onMounted, ref} from "vue";
import useAdmob from "@/hooks/useAdmob";
import {hapticsImpactMedium} from "@/hooks/useUtils";
import {chevronForwardOutline} from "ionicons/icons";

const {getAds, handleOnDBValueChange} = useFirebase();
const ads = ref({});
const onCancelAdsModal = () => {
  modalController.dismiss(null, 'cancel')
}

const handleRefresh = (event: CustomEvent) => {
  hapticsImpactMedium();
  getAds('Ads', '').then((res) => {
    ads.value = res.data;
    setTimeout(() => {
      event.detail.complete();
    }, 500);
  });
};

const onClickAdsBanner = (link: string) => {
  const openLink = ()=>{
    window.open(link);
  }
  if (localStorage.getItem('isUnlimited') !== 'true')
    useAdmob().showRewardVideo(openLink);
  else
    openLink();
}

const getAllAds = () => {
  getAds('Ads','').then((res) => {
    ads.value = res.data;
  });
}

onMounted(()=>{
  handleOnDBValueChange('Ads', getAllAds);
});
</script>

<style scoped>
ion-grid {
  --ion-grid-columns: 10;
}
</style>
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
        <IonRow class="ion-padding">
          <IonLabel class="ion-padding-bottom" style="font-weight: bold;text-decoration: underline">{{ad.name}}</IonLabel>
            <img :src="ad.imgUrl" alt="banner1" @click="onClickAdsBanner(ad.link)">
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
  IonRefresher, IonRefresherContent
} from "@ionic/vue"
import useFirebase from "@/hooks/useFirebase";
import {onMounted, ref} from "vue";
import useAdmob from "@/hooks/useAdmob";

const {getAds} = useFirebase();
const ads = ref({});
const onCancelAdsModal = () => {
  modalController.dismiss(null, 'cancel')
}

const handleRefresh = (event: CustomEvent) => {
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

onMounted(()=>{
  getAds('Ads','').then((res) => {
    ads.value = res.data;
  });
});
</script>

<style scoped>
ion-grid {
  --ion-grid-columns: 10;
}
</style>
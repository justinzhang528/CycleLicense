<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle align="center">
        <IonIcon :icon="accessibility" style="padding-right: 10px"/>
        <IonLabel>Study Sign</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
      <IonCard v-for="i in signImageCounts" :key="i">
        <IonIcon v-if="signBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="star" @click="onClickBookmarkIcon(i)"/>
        <IonIcon v-if="!signBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="starOutline" @click="onClickBookmarkIcon(i)"/>
        <IonTitle align="center" style="padding-right: 0; padding-top: 10px">{{ i }}/{{ signImageCounts }}</IonTitle>
        <IonImg :src="getImagePath('sign', handleZeroPad(i,3))"
                style="width: 50%; display: block; margin: 0 auto;"></IonImg>
        <IonImg :src="getImagePath('sign', handleZeroPad(i,3), 'w')"
                style="width: 75%; display: block; margin: 0 auto;"></IonImg>
      </IonCard>
  </IonContent>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonContent,
  IonCard,
  IonTitle,
  IonImg,
  IonLabel,
  toastController,
} from "@ionic/vue";
import {accessibility, star, starOutline} from "ionicons/icons";
import useImageData from '@/hooks/useImageData'
import {reactive} from "vue";

const showToast = async (msg: string) => {
  const toast = await toastController.create({
    message: msg,
    duration: 300,
    position: 'bottom',
  });
  await toast.present();
}

const {getImagePath, handleZeroPad, addOrRemoveFromArray, signImageCounts, getBookmarkedItems} = useImageData()
const signBookmarkedItems = reactive(getBookmarkedItems('signBookmarkedItems'))

const onClickBackButton = () => {
  localStorage.setItem('signBookmarkedItems', signBookmarkedItems.toString());
}

const onClickBookmarkIcon = (n: number) => {
  if (signBookmarkedItems.includes(n)) {
    showToast('Removed From Bookmark');
  } else {
    showToast('Added To Bookmark');
  }
  addOrRemoveFromArray(signBookmarkedItems,n);
}

</script>

<style scoped>

</style>
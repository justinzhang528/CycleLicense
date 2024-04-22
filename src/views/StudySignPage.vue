<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle align="center">
        <IonIcon :icon="trailSign" style="padding-right: 10px"/>
        <IonLabel>Sign</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
      <IonCard v-for="i in signImageCounts" :key="i">
        <IonIcon v-if="signBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmark" @click="onClickBookmarkIcon(i)"/>
        <IonIcon v-if="!signBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmarkOutline" @click="onClickBookmarkIcon(i)"/>
        <IonCardHeader>
          <IonCardSubtitle align="center" style="padding-left: 40px">{{ i }}/{{ signImageCounts }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonImg :src="getImagePath('sign', handleZeroPad(i,3), 'Q')"
                  style="width: 50%; display: block; margin: 0 auto;"></IonImg>
          <IonImg :src="getImagePath('sign', handleZeroPad(i,3), 'A')"
                  style="width: 75%; display: block; margin: 0 auto;"></IonImg>
        </IonCardContent>
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
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonTitle,
  IonImg,
  IonLabel,
  toastController,
} from "@ionic/vue";
import {trailSign, bookmark, bookmarkOutline} from "ionicons/icons";
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
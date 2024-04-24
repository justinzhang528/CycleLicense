<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="trailSign" style="padding-right: 10px"/>
        <IonLabel>{{$t('sign')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
      <IonCard v-for="i in signCounts" :key="i">
        <IonIcon v-if="signBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmark" @click="onClickBookmarkIcon(i)"/>
        <IonIcon v-if="!signBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmarkOutline" @click="onClickBookmarkIcon(i)"/>
        <IonCardHeader>
          <IonCardSubtitle class="center" style="padding-left: 40px">{{ i }}/{{ signCounts }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonImg :src="getImagePath('sign', handleZeroPad(i,3), 'Q')"
                  style="width: 50%; display: block; margin: 0 auto;"></IonImg>
          <IonImg :src="getImagePath('sign', handleZeroPad(i,3), 'A')"
                  style="width: 75%; display: block; margin: 0 auto;"></IonImg>
<!--          <IonLabel class="center" style="color: black; width: 75%; display: block; margin: 0 auto;">ဘေးအန္တရာယ်ကင်းရှင်းစွာ</IonLabel>-->
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
import rule from "@/json/rules.json";

const showToast = async (msg: string) => {
  const toast = await toastController.create({
    message: msg,
    duration: 300,
    position: 'bottom',
  });
  await toast.present();
}

const {getImagePath, handleZeroPad, addOrRemoveFromArray, signCounts, getBookmarkedItems} = useImageData()
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
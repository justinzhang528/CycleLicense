<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="trailSign" style="padding-right: 10px"/>
        <IonLabel>{{$t('sign')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent ref="contentRef" :scrollEvents="true" @ionScroll="onScroll">
      <IonCard v-for="i in signCounts" :key="i">
        <IonIcon class="iconBtn" size="large" style="float: left; margin: 5px;" :icon="playCircleOutline" @click="playSignSound(i-1)"/>
        <IonIcon v-if="signBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmark" @click="onClickBookmarkIcon(i)"/>
        <IonIcon v-if="!signBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmarkOutline" @click="onClickBookmarkIcon(i)"/>
        <IonCardHeader>
          <IonCardSubtitle class="center" style="padding-left: 40px">{{ i }}/{{ signCounts }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent class="center">
          <IonImg :src="getImagePath('sign', handleZeroPad(i,3), 'Q')"
                  style="width: 50%; display: block; margin: 0 auto;"></IonImg>
          <IonLabel style="color: black; display: block; margin: 0 auto; padding-bottom: 20px">{{ dataSource.signs[i-1].A }}</IonLabel>
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
  IonButton,
  toastController,
} from "@ionic/vue";
import {trailSign, bookmark, bookmarkOutline, playCircleOutline} from "ionicons/icons";
import useData from '@/hooks/useData'
import {reactive, ref} from "vue";
import {useI18n} from "vue-i18n";
import dataSource from "@/json/dataSource.json";
import useSound from "@/hooks/useSound";

const {playSignSound} = useSound();
const {t} = useI18n();
const showToast = async (msg: string) => {
  const toast = await toastController.create({
    message: msg,
    duration: 300,
    position: 'bottom',
  });
  await toast.present();
}

const {getImagePath, handleZeroPad, addOrRemoveFromArray, signCounts, getBookmarkedItems} = useData()
const signBookmarkedItems = reactive(getBookmarkedItems('signBookmarkedItems'))

const onClickBackButton = () => {
  localStorage.setItem('signBookmarkedItems', signBookmarkedItems.toString());
  localStorage.setItem('signScrollPosition', previousPosition.value.toString());
  console.log(previousPosition.value);
}

const onClickBookmarkIcon = (n: number) => {
  if (signBookmarkedItems.includes(n)) {
    showToast(t('removedFromBookmark'));
  } else {
    showToast(t('addedToBookmark'));
  }
  addOrRemoveFromArray(signBookmarkedItems,n);
}

const onScroll = (e: CustomEvent)=>{
  previousPosition.value = e.detail.currentY.toString();
}

const contentRef = ref();
const previousPosition = ref(parseInt(localStorage.getItem('signScrollPosition')) || 0);
const scrollToPreviousPosition = () => {
  console.log(previousPosition.value);
  contentRef.value.$el.scrollToPoint(0, previousPosition.value,150);
};

</script>

<style scoped>
</style>
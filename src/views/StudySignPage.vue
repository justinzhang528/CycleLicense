<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
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
        <IonIcon color="dark" class="iconBtn" size="large" style="float: left; margin: 5px;" :icon="playCircleOutline" @click="playSignAudio(i-1)"/>
        <IonIcon color="dark" v-if="signBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmark" @click="onClickBookmarkIcon(i)"/>
        <IonIcon color="dark" v-if="!signBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmarkOutline" @click="onClickBookmarkIcon(i)"/>
        <IonCardHeader>
          <IonCardSubtitle class="center" style="padding-left: 40px">{{ i }}/{{ signCounts }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent class="center">
          <img :src="getImagePath('sign', handleZeroPad(i,3), 'Q')"
                  style="width: 50%; display: block; margin: 0 auto;" alt="signImg">
          <IonLabel color="dark" style="display: block; margin: 0 auto; padding: 0 20px 20px 20px">{{ dataSource.signs[i-1].A }}</IonLabel>
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
  IonLabel,
  toastController,
} from "@ionic/vue";
import {trailSign, bookmark, bookmarkOutline, playCircleOutline} from "ionicons/icons";
import useData from '@/hooks/useData'
import {reactive, ref, onMounted, onUnmounted} from "vue";
import {useI18n} from "vue-i18n";
import dataSource from "@/json/dataSource.json";
import useAudio from "@/hooks/useAudio";

const {playSignAudio} = useAudio();
const {t} = useI18n();
const contentRef = ref();
const {getImagePath, handleZeroPad, addOrRemoveFromArray, signCounts, getBookmarkedItems} = useData()
const signBookmarkedItems = reactive(getBookmarkedItems('signBookmarkedItems'))

const showToast = async (msg: string) => {
  const toast = await toastController.create({
    message: msg,
    duration: 300,
    position: 'bottom',
  });
  await toast.present();
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

const previousPosition = ref(parseInt(localStorage.getItem('signScrollPosition')) || 0);
const scrollToPreviousPosition = () => {
  contentRef.value.$el.scrollToPoint(0, previousPosition.value,150);
  console.log(previousPosition.value);
};

onMounted(()=>{
  scrollToPreviousPosition();
})

onUnmounted(()=>{
  localStorage.setItem('signBookmarkedItems', signBookmarkedItems.toString());
  localStorage.setItem('signScrollPosition', previousPosition.value.toString());
})
</script>

<style scoped>
</style>
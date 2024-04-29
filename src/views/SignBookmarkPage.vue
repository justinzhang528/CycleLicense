<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="bookmark" style="padding-right: 10px"/>
        <IonLabel>{{$t('sign')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
      <IonCard v-for="i in signBookmarkedItems" :key="i">
        <IonIcon class="iconBtn" size="large" style="float: left; margin: 5px;" :icon="playCircleOutline" @click="playSignSound(i-1)"/>
        <IonIcon size="large" style="float: right; margin: 4px" :icon="trashBin" @click="onClickTrashBinIcon(i)"/>
        <IonCardHeader>
          <IonCardSubtitle class="center" style="padding-left: 40px">{{ i }}/{{ signCounts }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent class="center">
          <IonImg :src="getImagePath('sign', handleZeroPad(i,3),'Q')"
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
  toastController,
} from "@ionic/vue";
import {bookmark, playCircleOutline, trashBin} from "ionicons/icons";
import useData from '@/hooks/useData'
import {reactive, onMounted, onUnmounted} from "vue";
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

const {getImagePath, handleZeroPad, addOrRemoveFromArray, getBookmarkedItems, signCounts} = useData()
const signBookmarkedItems = reactive(getBookmarkedItems('signBookmarkedItems'))

const onClickTrashBinIcon = (n: number) => {
  addOrRemoveFromArray(signBookmarkedItems,n);
  showToast(t('removedFromBookmark'));
}

onUnmounted(()=>{
  localStorage.setItem('signBookmarkedItems', signBookmarkedItems.toString());
})

</script>

<style scoped>

</style>
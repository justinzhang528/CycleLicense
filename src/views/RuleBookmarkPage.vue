<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle align="center">
        <IonIcon :icon="bookmark" style="padding-right: 10px"/>
        <IonLabel>Rule</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
      <IonCard v-for="item in ruleBookmarkedItems" :key="item">
        <IonIcon size="large" style="float: right; margin: 4px" :icon="trashBin" @click="onClickTrashBinIcon(item)"/>
<!--        <IonTitle align="center" style="padding-right: 0; padding-top: 10px">{{ item }}/{{ ruleImageCounts }}</IonTitle>-->
        <IonImg :src="getImagePath('rule', handleZeroPad(item,3), 'Q')"
                style="display: block; margin: 0 auto;"></IonImg>
        <IonImg :src="getImagePath('rule', handleZeroPad(item,3), 'A')"
                style="display: block; margin: 0 auto;"></IonImg>
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
import {bookmark, trashBin} from "ionicons/icons";
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

const {getImagePath, handleZeroPad, addOrRemoveFromArray, ruleImageCounts, getBookmarkedItems} = useImageData()
const ruleBookmarkedItems = reactive(getBookmarkedItems('ruleBookmarkedItems'))

const onClickBackButton = () => {
  localStorage.setItem('ruleBookmarkedItems', ruleBookmarkedItems.toString());
}

const onClickTrashBinIcon = (n: number) => {
  addOrRemoveFromArray(ruleBookmarkedItems,n);
  showToast('Removed From Bookmark');
}

</script>

<style scoped>

</style>
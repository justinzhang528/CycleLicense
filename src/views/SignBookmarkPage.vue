<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="bookmark" style="padding-right: 10px"/>
        <IonLabel>{{$t('sign')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
      <IonCard v-for="item in signBookmarkedItems" :key="item">
        <IonIcon size="large" style="float: right; margin: 4px" :icon="trashBin" @click="onClickTrashBinIcon(item)"/>
        <IonCardHeader>
          <IonCardSubtitle class="center" style="padding-left: 40px"></IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonImg :src="getImagePath('sign', handleZeroPad(item,3),'Q')"
                  style="width: 50%; display: block; margin: 0 auto;"></IonImg>
          <IonImg :src="getImagePath('sign', handleZeroPad(item,3), 'A')"
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
import {bookmark, trashBin} from "ionicons/icons";
import useImageData from '@/hooks/useImageData'
import {reactive} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const showToast = async (msg: string) => {
  const toast = await toastController.create({
    message: msg,
    duration: 300,
    position: 'bottom',
  });
  await toast.present();
}

const {getImagePath, handleZeroPad, addOrRemoveFromArray, getBookmarkedItems} = useImageData()
const signBookmarkedItems = reactive(getBookmarkedItems('signBookmarkedItems'))

const onClickBackButton = () => {
  localStorage.setItem('signBookmarkedItems', signBookmarkedItems.toString());
}

const onClickTrashBinIcon = (n: number) => {
  addOrRemoveFromArray(signBookmarkedItems,n);
  showToast(t('removedFromBookmark'));
}

</script>

<style scoped>

</style>
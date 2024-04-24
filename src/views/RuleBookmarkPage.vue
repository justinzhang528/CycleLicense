<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="bookmark" style="padding-right: 10px"/>
        <IonLabel>{{$t('rule')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
      <IonCard v-for="i in ruleBookmarkedItems" :key="i">
        <IonIcon size="large" style="float: right; margin: 4px" :icon="trashBin" @click="onClickTrashBinIcon(i)"/>
        <IonCardHeader>
          <IonCardSubtitle class="center" style="padding-left: 40px"></IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('question')}} {{$t(':')}}</IonLabel>
          <IonLabel style="color: black;">{{rule.rules[i].Q}}</IonLabel><br><br>
          <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('answer')}} {{$t(':')}} </IonLabel>
          <IonLabel style="color: black;">{{rule.rules[i].A}}</IonLabel><br><br>
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
import rule from "@/json/rules.json";

const showToast = async (msg: string) => {
  const toast = await toastController.create({
    message: msg,
    duration: 300,
    position: 'bottom',
  });
  await toast.present();
}

const {getImagePath, handleZeroPad, addOrRemoveFromArray, ruleCounts, getBookmarkedItems} = useImageData()
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
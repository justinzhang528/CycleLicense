<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="newspaper" style="padding-right: 10px"/>
        <IonLabel>{{$t('rule')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
      <IonCard v-for="i in ruleCounts" :key="i">
        <IonIcon v-if="ruleBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmark" @click="onClickBookmarkIcon(i)"/>
        <IonIcon v-if="!ruleBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmarkOutline" @click="onClickBookmarkIcon(i)"/>
        <IonCardHeader>
          <IonCardSubtitle class="center" style="padding-left: 40px">{{ i }}/{{ ruleCounts }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('question')}} {{$t(':')}}</IonLabel>
          <IonLabel style="color: black;">{{rule.rules[i].Q}}</IonLabel><br><br>
          <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('answer')}} {{$t(':')}} </IonLabel>
          <IonLabel style="color: black;">{{rule.rules[i].A}}</IonLabel>
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
import {bookmark, bookmarkOutline, newspaper} from "ionicons/icons";
import useImageData from '@/hooks/useImageData'
import {reactive} from "vue";
import rule from '@/json/rules.json'

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

const onClickBookmarkIcon = (n: number) => {
  if (ruleBookmarkedItems.includes(n)) {
    showToast('Removed From Bookmark');
  } else {
    showToast('Added To Bookmark');
  }
  addOrRemoveFromArray(ruleBookmarkedItems,n);
}

</script>

<style scoped>

</style>
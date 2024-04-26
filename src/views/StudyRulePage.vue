<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="newspaper" style="padding-right: 10px"/>
        <IonLabel>{{$t('rule')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
      <IonCard v-for="i in ruleCounts" :key="i">
        <IonIcon class="iconBtn" size="large" style="float: left; margin: 5px;" :icon="playCircleOutline" @click="onPlayAudio(i-1)"/>
        <IonIcon v-if="ruleBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmark" @click="onClickBookmarkIcon(i)"/>
        <IonIcon v-if="!ruleBookmarkedItems.includes(i)" size="large" style="float: right; margin: 4px" :icon="bookmarkOutline" @click="onClickBookmarkIcon(i)"/>
        <IonCardHeader>
          <IonCardSubtitle class="center" style="padding-left: 40px">{{ i }}/{{ ruleCounts }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('question')}} {{$t(':')}}</IonLabel>
          <IonLabel style="color: black;">{{ dataSource.rules[i-1].Q }}</IonLabel><br><br>
          <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('answer')}} {{$t(':')}} </IonLabel>
          <IonLabel style="color: black;">{{ dataSource.rules[i-1].A }}</IonLabel>
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
import {bookmark, bookmarkOutline, newspaper, playCircleOutline} from "ionicons/icons";
import useData from '@/hooks/useData'
import {reactive} from "vue";
import dataSource from '@/json/dataSource.json'
import {useI18n} from "vue-i18n";
import useSound from "@/hooks/useSound";

const {ruleSounds} = useSound();
const onPlayAudio = (index: number) =>{
  const audio = new Audio(ruleSounds[index]) ;
  audio.play();
}

const {t} = useI18n();
const showToast = async (msg: string) => {
  const toast = await toastController.create({
    message: msg,
    duration: 300,
    position: 'bottom',
  });
  await toast.present();
}

const {addOrRemoveFromArray, ruleCounts, getBookmarkedItems} = useData()
const ruleBookmarkedItems = reactive(getBookmarkedItems('ruleBookmarkedItems'))

const onClickBackButton = () => {
  localStorage.setItem('ruleBookmarkedItems', ruleBookmarkedItems.toString());
}

const onClickBookmarkIcon = (n: number) => {
  if (ruleBookmarkedItems.includes(n)) {
    showToast(t('removedFromBookmark'));
  } else {
    showToast(t('addedToBookmark'));
  }
  addOrRemoveFromArray(ruleBookmarkedItems,n);
}

</script>

<style scoped>

</style>
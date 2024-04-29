<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :text="$t('back')"></IonBackButton>
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
          <IonCardSubtitle class="center" style="padding-left: 40px">{{ i }}/{{ ruleCounts }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonIcon class="iconBtn" size="large" :icon="playCircleOutline" @click="playRuleAudio(i-1)"/>
          <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('question')}} {{$t(':')}}</IonLabel>
          <IonLabel style="color: black;">{{ dataSource.rules[i-1].Q }}</IonLabel><br><br>
          <IonIcon class="iconBtn" size="large" :icon="playCircleOutline" @click="playRuleAudio(i-1)"/>
          <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('answer')}} {{$t(':')}} </IonLabel>
          <IonLabel style="color: black;">{{ dataSource.rules[i-1].A }}</IonLabel><br><br>
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
import {bookmark, playCircleOutline, trashBin} from "ionicons/icons";
import useData from '@/hooks/useData'
import {reactive, onUnmounted} from "vue";
import dataSource from "@/json/dataSource.json";
import {useI18n} from "vue-i18n";
import useAudio from "@/hooks/useAudio";

const {playRuleAudio} = useAudio();
const {t} = useI18n();
const showToast = async (msg: string) => {
  const toast = await toastController.create({
    message: msg,
    duration: 300,
    position: 'bottom',
  });
  await toast.present();
}

const {addOrRemoveFromArray, getBookmarkedItems, ruleCounts} = useData()
const ruleBookmarkedItems = reactive(getBookmarkedItems('ruleBookmarkedItems'))

const onClickTrashBinIcon = (n: number) => {
  addOrRemoveFromArray(ruleBookmarkedItems,n);
  showToast(t('removedFromBookmark'));
}

onUnmounted(()=>{
  localStorage.setItem('ruleBookmarkedItems', ruleBookmarkedItems.toString());
})

</script>

<style scoped>

</style>
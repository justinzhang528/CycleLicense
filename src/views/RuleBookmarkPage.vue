<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonLabel>{{$t('rule')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
      <IonCard v-for="i in ruleBookmarkedItems" :key="i">
        <IonIcon color="dark" size="large" style="float: right; margin: 4px" :icon="trashBin" @click="onClickTrashBinIcon(i)"/>
        <IonCardHeader>
          <IonCardSubtitle class="center" style="padding-left: 40px">{{ i }}/{{ ruleCounts }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonIcon color="dark" v-if="!isPlayingRuleQuestionAudio[i-1]" size="large" :icon="playCircleOutline" @click="onClickPlayQuestionAudio(i-1)"/>
          <IonIcon color="dark" v-if="isPlayingRuleQuestionAudio[i-1]" size="large" :icon="pauseCircleOutline" @click="onClickPlayQuestionAudio(i-1)"/>
          <IonLabel color="dark" style="font-weight: bold; padding-right: 5px">{{$t('question')}} {{$t(':')}}</IonLabel>
          <IonLabel color="dark">{{ dataSource.rules[i-1].Q }}</IonLabel><br><br>
          <IonIcon color="dark" v-if="!isPlayingRuleAnswerAudio[i-1]" size="large" :icon="playCircleOutline" @click="onClickPlayAnswerAudio(i-1)"/>
          <IonIcon color="dark" v-if="isPlayingRuleAnswerAudio[i-1]" size="large" :icon="pauseCircleOutline" @click="onClickPlayAnswerAudio(i-1)"/>
          <IonLabel color="dark" style="font-weight: bold; padding-right: 5px">{{$t('answer')}} {{$t(':')}} </IonLabel>
          <IonLabel color="dark">{{ dataSource.rules[i-1].A }}</IonLabel><br><br>
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
} from "@ionic/vue";
import {pauseCircleOutline, playCircleOutline, trashBin} from "ionicons/icons";
import useData from '@/hooks/useData'
import {reactive, onUnmounted} from "vue";
import dataSource from "@/json/dataSource.json";
import {useI18n} from "vue-i18n";
import useAudio from "@/hooks/useAudio";
import {showToast} from "@/hooks/useUtils";

const {playRuleQuestionAudio,playRuleAnswerAudio,isPlayingRuleAnswerAudio,isPlayingRuleQuestionAudio,pauseAudio} = useAudio();
const {t} = useI18n();
const {addOrRemoveFromArray, getBookmarkedItems, ruleCounts} = useData()
const ruleBookmarkedItems = reactive(getBookmarkedItems('ruleBookmarkedItems'))

const onClickTrashBinIcon = (n: number) => {
  addOrRemoveFromArray(ruleBookmarkedItems,n);
  showToast(t('removedFromBookmark'));
}

const onClickPlayQuestionAudio = (n: number) => {
  if(!isPlayingRuleQuestionAudio.value[n]){
    pauseAudio();
    const currentAudio = playRuleQuestionAudio(n);
    currentAudio.onended = () => {
      isPlayingRuleQuestionAudio.value[n] = false;
    }
  } else {
    pauseAudio();
  }
  for (let i = 0; i < ruleCounts; i++) {
    isPlayingRuleAnswerAudio.value[i] = false;
    if(i===n) continue;
    isPlayingRuleQuestionAudio.value[i] = false;
  }
  isPlayingRuleQuestionAudio.value[n] = !isPlayingRuleQuestionAudio.value[n];
}

const onClickPlayAnswerAudio = (n: number) => {
  if(!isPlayingRuleAnswerAudio.value[n]){
    pauseAudio();
    const currentAudio = playRuleAnswerAudio(n);
    currentAudio.onended = () => {
      isPlayingRuleAnswerAudio.value[n] = false;
    }
  } else {
    pauseAudio();
  }
  for (let i = 0; i < ruleCounts; i++) {
    isPlayingRuleQuestionAudio.value[i] = false;
    if(i===n) continue;
    isPlayingRuleAnswerAudio.value[i] = false;
  }
  isPlayingRuleAnswerAudio.value[n] = !isPlayingRuleAnswerAudio.value[n];
}

onUnmounted(()=>{
  localStorage.setItem('ruleBookmarkedItems', ruleBookmarkedItems.toString());
})

</script>

<style scoped>

</style>
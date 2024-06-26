<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonButtons slot="end">
        <IonMenuButton></IonMenuButton>
      </IonButtons>
      <IonTitle class="center">
        {{ $t('rule') }}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent ref="contentRef" :scrollEvents="true" className="ion-text-center">
    <div v-if="isShowSetting">
      <div class="ion-padding">
        <span class="center" v-if="userInfo.isUnlimited">
          <img :src="'images/icon/unlimitedIcon.png'" alt="unlimited" style="width: 10%"/>
        </span>
        <span v-for="i in life.totalLife" v-if="userInfo.name && !userInfo.isUnlimited">
          <IonIcon v-if="life.currentLife>=i" :icon="heart" style="font-size: 26px" color="warning"></IonIcon>
          <IonIcon v-if="life.currentLife<i" :icon="heartOutline" style="font-size: 26px" color="warning"></IonIcon>
        </span>
      </div>
      <img :src="'images/trueFalse.png'" alt="trueFalse" style="width: 60%"/>
      <h5 style="padding-bottom: 15px">{{$t('setTheNumberOfQuestions')}}</h5>
      <IonItem class="center">
        <IonLabel>{{$t('trueFalse')}} - {{t('rule')}}<br><p>({{$t('rangeMustBe')}} {{'5 ~ '+dataSource.rules.length}})</p></IonLabel>
        <IonButton color="dark" @click="onClickDecrement">-</IonButton>
        <IonInput style="width: 25%" type="number" :readonly="true" v-model="problemCounts"></IonInput>
        <IonButton color="dark" @click="onClickIncrement">+</IonButton>
      </IonItem><br>
      <IonButton :onClick="onClickStartTesting" color="dark" shape="round">
        {{$t('startTesting')}}
      </IonButton>
    </div>

    <div v-if="!isShowSetting" class="ion-padding">
      <h3>{{ currentProblemNum }}/{{ problemCounts }}</h3>
      <span hidden>
      {{ question = Number(problems[currentProblemNum - 1].data.question)-1}}
      {{ trueFalse = Number(problems[currentProblemNum - 1].data.trueFalse)-1}}
      </span>
      <IonCard>
        <IonCardContent align="left">
          <IonIcon color="dark" v-if="!isPlayingRuleQuestionAudio[question]" size="large" :icon="playCircleOutline" @click="onClickPlayQuestionAudio(question)"/>
          <IonIcon color="dark" v-if="isPlayingRuleQuestionAudio[question]" size="large" :icon="pauseCircleOutline" @click="onClickPlayQuestionAudio(question)"/>
          <IonLabel color="dark" style="font-weight: bold; padding-right: 5px">{{$t('question')}} {{$t(':')}}</IonLabel>
          <IonLabel color="dark">{{ dataSource.rules[question].Q }}</IonLabel><br><br>
          <IonIcon color="dark" v-if="!isPlayingRuleAnswerAudio[trueFalse]" size="large" :icon="playCircleOutline" @click="onClickPlayAnswerAudio(trueFalse)"/>
          <IonIcon color="dark" v-if="isPlayingRuleAnswerAudio[trueFalse]" size="large" :icon="pauseCircleOutline" @click="onClickPlayAnswerAudio(trueFalse)"/>
          <IonLabel color="dark" style="font-weight: bold; padding-right: 5px">{{$t('answer')}} {{$t(':')}} </IonLabel>
          <IonLabel color="dark">{{ dataSource.rules[trueFalse].A }}</IonLabel>
        </IonCardContent>
      </IonCard>

      <div style="width: 90%" class="center">
        <IonRadioGroup class='content-center' :value="currentSelectedValue" @ionChange="onRadioSelectedChange">
          <IonItem color="transparent" class="center ion-item-border" lines="none"><span style="width: 100%" >
              <IonThumbnail class="center">
                <img alt="true" :src="'images/icon/trueIcon.png'">
              </IonThumbnail>
            </span>
            <IonRadio mode="md" value="1"></IonRadio>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none"><span style="width: 100%" >
              <IonThumbnail class="center">
                <img alt="true" :src="'images/icon/falseIcon.png'">
              </IonThumbnail>
            </span>
            <IonRadio mode="md" value="0"></IonRadio>
          </IonItem>
        </IonRadioGroup>
      </div>

      <IonButton :onClick="onClickNextButton" color="dark" shape="round">
        <IonIcon :icon="chevronForward"/>
      </IonButton>
      <IonNavLink id='goToTrueFalseRuleResultPage' routerDirection="forward" :component="trueFalseRuleResultPage">
      </IonNavLink>
    </div>
  </IonContent>
</template>

<script setup lang="ts">
import {
  IonNavLink,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons,
  IonButton,
  IonBackButton,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonIcon,
  IonLabel,
  IonCardContent,
  IonCard, IonInput, IonThumbnail, IonMenuButton, IonRow,
} from "@ionic/vue";
import {chevronForward, playCircleOutline, pauseCircleOutline, heart, heartOutline} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useData from '@/hooks/useData';
import {useI18n} from "vue-i18n";
import TrueFalseRuleResultPage from '@/views/Page/TrueFalseRuleResultPage.vue'
import dataSource from '@/json/dataSource.json'
import useAudio from "@/hooks/useAudio";
import {showToast, showAlert, showFinishAlert, showAlertWithAction} from "@/hooks/useUtils";
import useAdmob from "@/hooks/useAdmob";

const {playRuleQuestionAudio,playRuleAnswerAudio,isPlayingRuleAnswerAudio,isPlayingRuleQuestionAudio,pauseAudio,playTestEndingAudio} = useAudio();
const {t} = useI18n();
const trueFalseRuleResultPage = markRaw(TrueFalseRuleResultPage);
const {generateTrueFalseProblem, ruleCounts, DEFAULT_PROBLEM_COUNT, INCREMENT_PROBLEM_COUNT, life} = useData()
const problemCounts = ref(DEFAULT_PROBLEM_COUNT);
let problems: any[] = [];
let currentSelectedValue = ref('');
let currentProblemNum = ref(1);
let chooseAns: string[] = [];
const isShowSetting = ref(true);
const {showInterstitial,showRewardVideo} = useAdmob();
let userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'));
const contentRef = ref();

const onRadioSelectedChange = (e: CustomEvent) => {
  currentSelectedValue.value = e.detail.value;
}

const onClickFinishConfirm = () => {
  isShowSetting.value = true;
  currentSelectedValue.value = '';
  currentProblemNum.value = 1;
  localStorage.setItem('trueFalseRuleProblems', JSON.stringify(problems));
  localStorage.setItem('userTrueFalseRuleValues', chooseAns.toString());
  chooseAns.splice(0);
  const navLink = document.querySelector('#goToTrueFalseRuleResultPage');
  (navLink as HTMLElement).click();
  showInterstitial();
}

const onClickNextButton = () => {
  if (currentSelectedValue.value === '') {
    showToast(t('pleaseChooseAnswer'));
    return;
  }
  chooseAns.push(currentSelectedValue.value);
  if (currentProblemNum.value >= problemCounts.value) {
    playTestEndingAudio();
    showFinishAlert(t('testFinish'), "", "", t("viewResult"), onClickFinishConfirm)
    return;
  }
  currentSelectedValue.value = '';
  currentProblemNum.value += 1;
  contentRef.value.$el.scrollToPoint(0, 0,150);
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

const addLife = ()=>{
  life.value.currentLife++;
  localStorage.setItem('currentLife',(life.value.currentLife).toString());
  showToast(t('youGotOneLife'),3000);
}

const onClickStartTesting = ()=>{
  if(life.value.currentLife<=0 && !userInfo.value.isUnlimited){
    showAlertWithAction(t('warning'), t('noLife'), t('watchVideoToGetLife'), t('confirm'), t("cancel"), showRewardVideo, addLife);
    return;
  }
  if(problemCounts.value < 1 || problemCounts.value > dataSource.rules.length){
    showAlert(t('warning'), t('invalidQuestionNumber'), t('rangeMustBe')+' 5 ~ '+dataSource.rules.length, t('confirm'));
    return;
  }
  problems =  generateTrueFalseProblem(problemCounts.value, ruleCounts, "trueFalseRule");
  isShowSetting.value = false;
  if(!userInfo.value.isUnlimited){
    life.value.currentLife--;
    localStorage.setItem('currentLife',(life.value.currentLife).toString());
  }
}

const onClickDecrement = ()=>{
  if(problemCounts.value === dataSource.rules.length && dataSource.rules.length % INCREMENT_PROBLEM_COUNT !== 0)
    problemCounts.value -= dataSource.rules.length % INCREMENT_PROBLEM_COUNT;
  else if(problemCounts.value > INCREMENT_PROBLEM_COUNT)
    problemCounts.value-=INCREMENT_PROBLEM_COUNT;
}

const onClickIncrement = ()=>{
  if(problemCounts.value < dataSource.rules.length)
    problemCounts.value+=INCREMENT_PROBLEM_COUNT;
  if(problemCounts.value > dataSource.rules.length)
    problemCounts.value = dataSource.rules.length;
}

</script>

<style scoped>

</style>
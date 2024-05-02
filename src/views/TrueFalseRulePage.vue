<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="checkmarkDone" style="padding-right: 10px"/>
        {{ $t('rule') }}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-text-center">
    <div v-if="isShowSetting">
      <img :src="'images/trueFalse.png'" alt="trueFalse" style="width: 75%"/>
      <h5 style="padding-bottom: 15px">{{$t('setTheNumberOfQuestions')}}</h5>
      <IonItem class="center">
        <IonLabel>{{$t('trueFalseRule')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.rules.length}})</p></IonLabel>
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
      {{ question = Number(problems[currentProblemNum - 1].question)-1}}
      {{ trueFalse = Number(problems[currentProblemNum - 1].trueFalse)-1}}
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
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <h5 class="center" style="width: 100%">{{ $t('true') }}</h5>
            <IonRadio mode="md" value="1"></IonRadio>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <h5 class="center" style="width: 100%">{{ $t('false') }}</h5>
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
  toastController,
  alertController,
  IonLabel,
  IonCardContent,
  IonCard, IonInput,
} from "@ionic/vue";
import {checkmarkDone, chevronForward, playCircleOutline, pauseCircleOutline} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useData from '@/hooks/useData';
import {useI18n} from "vue-i18n";
import TrueFalseRuleResultPage from '@/views/TrueFalseRuleResultPage.vue'
import dataSource from '@/json/dataSource.json'
import useAudio from "@/hooks/useAudio";

const {playRuleQuestionAudio,playRuleAnswerAudio,isPlayingRuleAnswerAudio,isPlayingRuleQuestionAudio,pauseAudio} = useAudio();
const {t} = useI18n();
const trueFalseRuleResultPage = markRaw(TrueFalseRuleResultPage);

const showToast = async (msg: string) => {
  const toast = await toastController.create({
    message: msg,
    duration: 300,
    position: 'bottom',
  });
  await toast.present();
}

const showFinishAlert = async (header: string, subHeader: string, message: string, buttonText: string) => {
  const alert = await alertController.create({
    header: header,
    subHeader: subHeader,
    message: message,
    buttons: [
      {
        text: buttonText,
        role: 'confirm',
        handler: () => {
          currentSelectedValue.value = '';
          currentProblemNum.value = 1;
          localStorage.setItem('trueFalseRuleProblems', JSON.stringify(problems));
          localStorage.setItem('userTrueFalseRuleValues', chooseAns.toString());
          chooseAns.splice(0);
          const navLink = document.querySelector('#goToTrueFalseRuleResultPage');
          (navLink as HTMLElement).click();
        },
      }
    ],
    backdropDismiss: false,
  });

  await alert.present();
};

const showAlert = async (header: string, subHeader: string, message: string, buttonText: string) => {
  const alert = await alertController.create({
    header: header,
    subHeader: subHeader,
    message: message,
    buttons: [
      {
        text: buttonText,
        role: 'confirm',
      }
    ],
    backdropDismiss: false,
  });
  await alert.present();
}

const {generateTrueFalseProblem, ruleCounts} = useData()
const problemCounts = ref(10);
let problems: any[] = [];

let currentSelectedValue = ref('');
let currentProblemNum = ref(1);
let chooseAns: string[] = [];
const isShowSetting = ref(true);

const onRadioSelectedChange = (e: CustomEvent) => {
  currentSelectedValue.value = e.detail.value;
}

const onClickNextButton = () => {
  if (currentSelectedValue.value === '') {
    showToast(t('pleaseChooseAnswer'));
    return;
  }
  chooseAns.push(currentSelectedValue.value);
  if (currentProblemNum.value >= problemCounts.value) {
    showFinishAlert(t('testFinish'), "", "", t("viewResult"))
    return;
  }
  currentSelectedValue.value = '';
  currentProblemNum.value += 1;
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

const onClickStartTesting = ()=>{
  if(problemCounts.value < 1 || problemCounts.value > dataSource.rules.length){
    showAlert(t('warning'), '', t('invalidQuestionNumber'), t('confirm'));
    return;
  }
  problems =  generateTrueFalseProblem(problemCounts.value, ruleCounts);
  isShowSetting.value = false;
}

const onClickDecrement = ()=>{
  if(problemCounts.value > 5)
    problemCounts.value-=5;
}

const onClickIncrement = ()=>{
  if(problemCounts.value < dataSource.rules.length)
    problemCounts.value+=5;
}

</script>

<style scoped>

</style>
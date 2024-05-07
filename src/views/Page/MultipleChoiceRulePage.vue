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
        {{$t('rule')}}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-text-center">
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
      <img :src="'images/multipleChoice.png'" alt="multipleChoice" style="width: 60%"/>
      <h5 style="padding-bottom: 15px">{{$t('setTheNumberOfQuestions')}}</h5>
      <IonItem class="center">
        <IonLabel>{{$t('multipleChoiceRule')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.rules.length}})</p></IonLabel>
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
        {{ choice1 = Number(problems[currentProblemNum - 1].data.choice1)-1}}
        {{ choice2 = Number(problems[currentProblemNum - 1].data.choice2)-1}}
        {{ choice3 = Number(problems[currentProblemNum - 1].data.choice3)-1}}
        {{ choice4 = Number(problems[currentProblemNum - 1].data.choice4)-1}}
      </span>
      <IonCard>
        <IonCardContent>
          <IonItem color="transparent" class="center" lines="none">
            <IonIcon color="dark" v-if="!isPlayingRuleQuestionAudio[question]" size="large" :icon="playCircleOutline" @click="onClickPlayQuestionAudio(question)"/>
            <IonIcon color="dark" v-if="isPlayingRuleQuestionAudio[question]" size="large" :icon="pauseCircleOutline" @click="onClickPlayQuestionAudio(question)"/>
            <IonLabel color="dark">{{ dataSource.rules[Number(problems[currentProblemNum - 1].data.question)-1].Q }}</IonLabel>
          </IonItem>
        </IonCardContent>
      </IonCard>

      <div style="width: 90%" class="center">
        <IonRadioGroup class='content-center' :value="currentSelectedValue" @ionChange="onRadioSelectedChange">
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <IonIcon color="dark" v-if="!isPlayingRuleAnswerAudio[choice1]" size="large" :icon="playCircleOutline" @click="onClickPlayAnswerAudio(choice1)"/>
            <IonIcon color="dark" v-if="isPlayingRuleAnswerAudio[choice1]" size="large" :icon="pauseCircleOutline" @click="onClickPlayAnswerAudio(choice1)"/>
            <label style="font-weight: bold"> ({{$t("1")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.rules[choice1].A }}</label>
            <IonRadio mode="md" value="1"></IonRadio>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <IonIcon color="dark" v-if="!isPlayingRuleAnswerAudio[choice2]" size="large" :icon="playCircleOutline" @click="onClickPlayAnswerAudio(choice2)"/>
            <IonIcon color="dark" v-if="isPlayingRuleAnswerAudio[choice2]" size="large" :icon="pauseCircleOutline" @click="onClickPlayAnswerAudio(choice2)"/>
            <label style="font-weight: bold"> ({{$t("2")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.rules[choice2].A }}</label>
            <IonRadio mode="md" value="2"></IonRadio>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <IonIcon color="dark" v-if="!isPlayingRuleAnswerAudio[choice3]" size="large" :icon="playCircleOutline" @click="onClickPlayAnswerAudio(choice3)"/>
            <IonIcon color="dark" v-if="isPlayingRuleAnswerAudio[choice3]" size="large" :icon="pauseCircleOutline" @click="onClickPlayAnswerAudio(choice3)"/>
            <label style="font-weight: bold"> ({{$t("3")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.rules[choice3].A }}</label>
            <IonRadio mode="md" value="3"></IonRadio>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <IonIcon color="dark" v-if="!isPlayingRuleAnswerAudio[choice4]" size="large" :icon="playCircleOutline" @click="onClickPlayAnswerAudio(choice4)"/>
            <IonIcon color="dark" v-if="isPlayingRuleAnswerAudio[choice4]" size="large" :icon="pauseCircleOutline" @click="onClickPlayAnswerAudio(choice4)"/>
            <label style="font-weight: bold"> ({{$t("4")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.rules[choice4].A }}</label>
            <IonRadio mode="md" value="4"></IonRadio>
          </IonItem>
        </IonRadioGroup>
      </div>

      <IonButton :onClick="onClickNextButton" color="dark" shape="round">
        <IonIcon :icon="chevronForward"/>
      </IonButton>
      <IonNavLink id='goToMultipleChoiceRuleResultPage' routerDirection="forward" :component="multipleChoiceRuleResultPage">
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
  IonCard,
  IonCardContent,
  IonLabel,
  IonInput, IonMenuButton, IonRow,
} from "@ionic/vue";
import {chevronForward, playCircleOutline, pauseCircleOutline, heart, heartOutline} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useData from '@/hooks/useData'
import {useI18n} from "vue-i18n";
import MultipleChoiceRuleResultPage from '@/views/Page/MultipleChoiceRuleResultPage.vue'
import dataSource from '@/json/dataSource.json'
import useAudio from "@/hooks/useAudio";
import {showToast, showAlert, showFinishAlert, showAlertWithAction} from "@/hooks/useUtils";
import useAdmob from "@/hooks/useAdmob";

const {playRuleAnswerAudio,playRuleQuestionAudio,isPlayingRuleAnswerAudio,isPlayingRuleQuestionAudio,pauseAudio} = useAudio();
const {t} = useI18n();
const multipleChoiceRuleResultPage = markRaw(MultipleChoiceRuleResultPage);
const {generateMultipleChoiceProblems, ruleCounts, DEFAULT_PROBLEM_COUNT, INCREMENT_PROBLEM_COUNT, life} = useData()
const problemCounts = ref(DEFAULT_PROBLEM_COUNT);
let problems: any[] = [];
let currentSelectedValue = ref('');
let currentProblemNum = ref(1);
let chooseAns: string[] = [];
const isShowSetting = ref(true);
const {showInterstitial,showRewardVideo} = useAdmob();
let userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'));

const onRadioSelectedChange = (e: CustomEvent) => {
  currentSelectedValue.value = e.detail.value;
}

const onClickFinishConfirm = () => {
  isShowSetting.value = true;
  currentSelectedValue.value = '';
  currentProblemNum.value = 1;
  localStorage.setItem('multipleChoiceRuleProblems',JSON.stringify(problems));
  localStorage.setItem('userMultipleChoiceRuleValues',chooseAns.toString());
  chooseAns.splice(0);
  const navLink = document.querySelector('#goToMultipleChoiceRuleResultPage');
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
    showFinishAlert(t('testFinish'), "", "", t("viewResult"), onClickFinishConfirm)
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
    showAlert(t('warning'), t('invalidQuestionNumber'), t('rangeMustBe')+' 1 ~ '+dataSource.rules.length, t('confirm'));
    return;
  }
  problems =  generateMultipleChoiceProblems(problemCounts.value, ruleCounts, "multipleChoiceRule");
  isShowSetting.value = false;
  if(!userInfo.value.isUnlimited){
    life.value.currentLife--;
    localStorage.setItem('currentLife',(life.value.currentLife).toString());
  }
}

const onClickDecrement = ()=>{
  if(problemCounts.value > INCREMENT_PROBLEM_COUNT)
    problemCounts.value-=INCREMENT_PROBLEM_COUNT;
}

const onClickIncrement = ()=>{
  if(problemCounts.value < dataSource.rules.length)
    problemCounts.value+=INCREMENT_PROBLEM_COUNT;
}
</script>

<style scoped>

</style>
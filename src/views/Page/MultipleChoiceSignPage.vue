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
        {{$t('sign')}}
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
      <img :src="'images/multipleChoice.png'" alt="multipleChoice" style="width: 60%"/>
      <h5 style="padding-bottom: 15px">{{$t('setTheNumberOfQuestions')}}</h5>
      <IonItem class="center">
        <IonLabel>{{$t('multipleChoice')}} - {{t('sign')}}<br><p>({{$t('rangeMustBe')}} {{'5 ~ '+dataSource.signs.length}})</p></IonLabel>
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
      <IonItem color="transparent" lines="none">
        <IonImg :src="'images/sign/'+problems[currentProblemNum-1].data.question+'Q.png'" class="center round-border-img" style="width: 65%"/>
      </IonItem>
      <div style="width: 95%" class="center">
        <span hidden>
        {{ choice1 = Number(problems[currentProblemNum - 1].data.choice1)-1}}
        {{ choice2 = Number(problems[currentProblemNum - 1].data.choice2)-1}}
        {{ choice3 = Number(problems[currentProblemNum - 1].data.choice3)-1}}
        {{ choice4 = Number(problems[currentProblemNum - 1].data.choice4)-1}}
        </span>
        <IonRadioGroup class='content-center' :value="currentSelectedValue" @ionChange="onRadioSelectedChange">
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <IonIcon color="dark" v-if="!isPlayingSignAudio[choice1]" size="large" :icon="playCircleOutline" @click="onClickPlayAudio(choice1)"/>
            <IonIcon color="dark" v-if="isPlayingSignAudio[choice1]" size="large" :icon="pauseCircleOutline" @click="onClickPlayAudio(choice1)"/>
            <label style="font-weight: bold"> ({{$t("1")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.signs[choice1].A }}</label>
            <IonRadio mode="md" value="1"></IonRadio>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <IonIcon color="dark" v-if="!isPlayingSignAudio[choice2]" size="large" :icon="playCircleOutline" @click="onClickPlayAudio(choice2)"/>
            <IonIcon color="dark" v-if="isPlayingSignAudio[choice2]" size="large" :icon="pauseCircleOutline" @click="onClickPlayAudio(choice2)"/>
            <label style="font-weight: bold"> ({{$t("2")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.signs[choice2].A }}</label>
            <IonRadio mode="md" value="2"></IonRadio>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <IonIcon color="dark" v-if="!isPlayingSignAudio[choice3]" size="large" :icon="playCircleOutline" @click="onClickPlayAudio(choice3)"/>
            <IonIcon color="dark" v-if="isPlayingSignAudio[choice3]" size="large" :icon="pauseCircleOutline" @click="onClickPlayAudio(choice3)"/>
            <label style="font-weight: bold"> ({{$t("3")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.signs[choice3].A }}</label>
            <IonRadio mode="md" value="3"></IonRadio>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <IonIcon color="dark" v-if="!isPlayingSignAudio[choice4]" size="large" :icon="playCircleOutline" @click="onClickPlayAudio(choice4)"/>
            <IonIcon color="dark" v-if="isPlayingSignAudio[choice4]" size="large" :icon="pauseCircleOutline" @click="onClickPlayAudio(choice4)"/>
            <label style="font-weight: bold"> ({{$t("4")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.signs[choice4].A }}</label>
            <IonRadio mode="md" value="4"></IonRadio>
          </IonItem>
        </IonRadioGroup>
      </div>
      <IonButton :onClick="onClickNextButton" color="dark" shape="round">
        <IonIcon :icon="chevronForward"/>
      </IonButton>
      <IonNavLink id='goToMultipleChoiceSignResultPage' routerDirection="forward" :component="multipleChoiceSignResultPage">
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
  IonImg,
  IonInput,
  IonLabel, IonMenuButton, IonRow,
} from "@ionic/vue";
import {chevronForward, heart, heartOutline, pauseCircleOutline, playCircleOutline} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useData from '@/hooks/useData'
import {useI18n} from "vue-i18n";
import MultipleChoiceSignResultPage from '@/views/Page/MultipleChoiceSignResultPage.vue'
import dataSource from "@/json/dataSource.json"
import useAudio from "@/hooks/useAudio";
import {showToast, showFinishAlert, showAlert, showAlertWithAction} from "@/hooks/useUtils";
import useAdmob from "@/hooks/useAdmob";

const {playSignAudio, pauseAudio, isPlayingSignAudio, playTestEndingAudio} = useAudio();
const {t} = useI18n();
const multipleChoiceSignResultPage = markRaw(MultipleChoiceSignResultPage);
const isShowSetting = ref(true);
const {generateMultipleChoiceProblems, signCounts, DEFAULT_PROBLEM_COUNT, INCREMENT_PROBLEM_COUNT, life} = useData()
const problemCounts = ref(DEFAULT_PROBLEM_COUNT);
let problems: any[] = [];
let currentSelectedValue = ref('');
let currentProblemNum = ref(1);
let chooseAns: string[] = [];
const {showInterstitial,showRewardVideo} = useAdmob();
let userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'));
const contentRef = ref();

const onRadioSelectedChange = (e: CustomEvent) => {
  currentSelectedValue.value = e.detail.value;
}

const onClickFinishConfirm = ()=>{
  isShowSetting.value = true;
  currentSelectedValue.value = '';
  currentProblemNum.value = 1;
  localStorage.setItem('multipleChoiceSignProblems',JSON.stringify(problems));
  localStorage.setItem('userMultipleChoiceSignValues',chooseAns.toString());
  chooseAns.splice(0);
  const navLink = document.querySelector('#goToMultipleChoiceSignResultPage');
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

const onClickPlayAudio = (n: number) => {
  if(!isPlayingSignAudio.value[n]){
    pauseAudio();
    const currentAudio = playSignAudio(n);
    currentAudio.onended = () => {
      isPlayingSignAudio.value[n] = false;
    }
  } else {
    pauseAudio();
  }
  for (let i = 0; i < signCounts; i++) {
    if(i===n) continue;
    isPlayingSignAudio.value[i] = false;
  }
  isPlayingSignAudio.value[n] = !isPlayingSignAudio.value[n];
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
  if(problemCounts.value < 1 || problemCounts.value > dataSource.signs.length){
    showAlert(t('warning'), t('invalidQuestionNumber'), t('rangeMustBe')+' 5 ~ '+dataSource.signs.length, t('confirm'));
    return;
  }
  problems =  generateMultipleChoiceProblems(problemCounts.value, signCounts, 'multipleChoiceSign');
  isShowSetting.value = false;
  if(!userInfo.value.isUnlimited){
    life.value.currentLife--;
    localStorage.setItem('currentLife',(life.value.currentLife).toString());
  }
}

const onClickDecrement = ()=>{
  if(problemCounts.value === dataSource.signs.length && dataSource.signs.length % INCREMENT_PROBLEM_COUNT !== 0)
    problemCounts.value -= dataSource.signs.length % INCREMENT_PROBLEM_COUNT;
  else if(problemCounts.value > INCREMENT_PROBLEM_COUNT)
    problemCounts.value-=INCREMENT_PROBLEM_COUNT;
}

const onClickIncrement = ()=>{
  if(problemCounts.value < dataSource.signs.length)
    problemCounts.value+=INCREMENT_PROBLEM_COUNT;
  if(problemCounts.value > dataSource.signs.length)
    problemCounts.value = dataSource.signs.length;
}

</script>

<style scoped>

</style>
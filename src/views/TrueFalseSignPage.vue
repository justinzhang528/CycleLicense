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
  <IonContent className="ion-text-center">
    <div v-if="isShowSetting">
      <div class="ion-padding">
        <span class="center" v-if="userInfo.isUnlimited">
          <img :src="'images/icon/unlimitedIcon.png'" alt="unlimited" style="width: 10%"/>
        </span>
        <span v-for="i in life.totalLife" v-if="userInfo.name && !userInfo.isUnlimited">
          <IonIcon v-if="life.currentLife>=i" :icon="heart" style="font-size: 26px" color="warning"></IonIcon>
          <IonIcon v-if="life.currentLife<i" :icon="heartOutline" style="font-size: 26px"></IonIcon>
        </span>
      </div>
      <img :src="'images/trueFalse.png'" alt="trueFalse" style="width: 60%"/>
      <h5 style="padding-bottom: 15px">{{$t('setTheNumberOfQuestions')}}</h5>
      <IonItem class="center">
        <IonLabel>{{$t('trueFalseSign')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.signs.length}})</p></IonLabel>
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
      <IonCard>
        <IonCardContent>
          <span hidden>{{ trueFalse = Number(problems[currentProblemNum - 1].data.trueFalse)-1}}</span>
          <IonIcon color="dark" v-if="!isPlayingSignAudio[trueFalse]" size="large" style="float: left" :icon="playCircleOutline" @click="onClickPlayAudio(trueFalse)"/>
          <IonIcon color="dark" v-if="isPlayingSignAudio[trueFalse]" size="large" style="float: left" :icon="pauseCircleOutline" @click="onClickPlayAudio(trueFalse)"/>
          <IonItem color="transparent" lines="none">
            <IonImg :src="'images/sign/'+problems[currentProblemNum-1].data.question+'Q.png'" class="center round-border-img" style="width: 70%"/>
          </IonItem>
          <IonItem class="center" color="transparent" lines="none">
            <IonLabel color="dark" style="display: block; margin: 0 auto; padding-bottom: 5px">{{ dataSource.signs[trueFalse].A }}</IonLabel>
          </IonItem>
        </IonCardContent>
      </IonCard>

      <div style="width: 90%" class="center">
        <IonRadioGroup class='content-center' :value="currentSelectedValue" @ionChange="onRadioSelectedChange">
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <span style="width: 100%" >
              <IonThumbnail class="center">
                <img alt="true" :src="'images/icon/trueIcon.png'">
              </IonThumbnail>
            </span>
            <IonRadio mode="md" value="1"></IonRadio>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <span style="width: 100%" >
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
      <IonNavLink id='goToTrueFalseSignResultPage' routerDirection="forward" :component="trueFalseSignResultPage">
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
  IonCard,
  IonCardContent,
  IonLabel,
  IonInput,
  IonThumbnail, IonMenuButton, IonRow,
} from "@ionic/vue";
import {chevronForward, playCircleOutline, pauseCircleOutline, heart, heartOutline} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useData from '@/hooks/useData';
import {useI18n} from "vue-i18n";
import TrueFalseSignResultPage from '@/views/TrueFalseSignResultPage.vue'
import dataSource from "@/json/dataSource.json";
import useAudio from "@/hooks/useAudio";
import {showToast, showAlert, showFinishAlert, showAlertWithAction} from "@/hooks/useUtils";
import useAdmob from "@/hooks/useAdmob";

const {playSignAudio, isPlayingSignAudio, pauseAudio} = useAudio();
const {t} = useI18n();
const trueFalseSignResultPage = markRaw(TrueFalseSignResultPage);
const {generateTrueFalseProblem, signCounts, DEFAULT_PROBLEM_COUNT, INCREMENT_PROBLEM_COUNT, life} = useData()
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
  localStorage.setItem('trueFalseSignProblems',JSON.stringify(problems));
  localStorage.setItem('userTrueFalseSignValues',chooseAns.toString());
  chooseAns.splice(0);
  const navLink = document.querySelector('#goToTrueFalseSignResultPage');
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
    showAlert(t('warning'), t('invalidQuestionNumber'), t('rangeMustBe')+' 1 ~ '+dataSource.signs.length, t('confirm'));
    return;
  }
  problems =  generateTrueFalseProblem(problemCounts.value, signCounts, "trueFalseSign");
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
  if(problemCounts.value < dataSource.signs.length)
    problemCounts.value+=INCREMENT_PROBLEM_COUNT;
}
</script>

<style scoped>

</style>
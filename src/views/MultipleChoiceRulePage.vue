<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="listCircle" style="padding-right: 10px"/>
        {{$t('rule')}}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-text-center">
    <div v-if="isShowSetting">
      <img :src="'images/multipleChoice.png'" alt="multipleChoice" style="width: 75%"/>
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

    <div v-if="!isShowSetting">
      <h3>{{ currentProblemNum }}/{{ problemCounts }}</h3>
      <span hidden>
        {{ question = Number(problems[currentProblemNum - 1].question)-1}}
        {{ choice1 = Number(problems[currentProblemNum - 1].choice1)-1}}
        {{ choice2 = Number(problems[currentProblemNum - 1].choice2)-1}}
        {{ choice3 = Number(problems[currentProblemNum - 1].choice3)-1}}
        {{ choice4 = Number(problems[currentProblemNum - 1].choice4)-1}}
      </span>
      <IonCard>
        <IonCardContent>
          <IonItem color="transparent" class="center" lines="none">
            <IonIcon color="dark" v-if="!isPlayingRuleQuestionAudio[question]" size="large" :icon="playCircleOutline" @click="onClickPlayQuestionAudio(question)"/>
            <IonIcon color="dark" v-if="isPlayingRuleQuestionAudio[question]" size="large" :icon="pauseCircleOutline" @click="onClickPlayQuestionAudio(question)"/>
            <IonLabel color="dark">{{ dataSource.rules[Number(problems[currentProblemNum - 1].question)-1].Q }}</IonLabel>
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
  toastController,
  alertController, IonLabel, IonInput,
} from "@ionic/vue";
import {chevronForward, listCircle, playCircleOutline, pauseCircleOutline} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useData from '@/hooks/useData'
import {useI18n} from "vue-i18n";
import MultipleChoiceRuleResultPage from '@/views/MultipleChoiceRuleResultPage.vue'
import dataSource from '@/json/dataSource.json'
import useAudio from "@/hooks/useAudio";

const {playRuleAnswerAudio,playRuleQuestionAudio,isPlayingRuleAnswerAudio,isPlayingRuleQuestionAudio,pauseAudio} = useAudio();
const {t} = useI18n();
const multipleChoiceRuleResultPage = markRaw(MultipleChoiceRuleResultPage);

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
          localStorage.setItem('multipleChoiceRuleProblems',JSON.stringify(problems));
          localStorage.setItem('userMultipleChoiceRuleValues',chooseAns.toString());
          chooseAns.splice(0);
          const navLink = document.querySelector('#goToMultipleChoiceRuleResultPage');
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

const {generateMultipleChoiceProblems, ruleCounts} = useData()
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
  problems =  generateMultipleChoiceProblems(problemCounts.value, ruleCounts);
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
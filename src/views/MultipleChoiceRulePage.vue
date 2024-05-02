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
  alertController, IonLabel,
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

const {generateMultipleChoiceProblems, ruleCounts, DEFAULT_PROBLEM_COUNT} = useData()
const problemCounts = Number(localStorage.getItem('multipleChoiceRuleCount')) || DEFAULT_PROBLEM_COUNT;
const problems = generateMultipleChoiceProblems(problemCounts, ruleCounts);

let currentSelectedValue = ref('');
let currentProblemNum = ref(1);
let chooseAns: string[] = [];

const onRadioSelectedChange = (e: CustomEvent) => {
  currentSelectedValue.value = e.detail.value;
}

const onClickNextButton = () => {
  if (currentSelectedValue.value === '') {
    showToast(t('pleaseChooseAnswer'));
    return;
  }
  chooseAns.push(currentSelectedValue.value);
  if (currentProblemNum.value >= problemCounts) {
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
</script>

<style scoped>

</style>
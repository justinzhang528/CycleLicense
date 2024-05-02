<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="listCircle" style="padding-right: 10px"/>
        {{$t('sign')}}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <h3>{{ currentProblemNum }}/{{ problemCounts }}</h3>
    <IonItem color="transparent" lines="none">
      <IonImg :src="'images/sign/'+problems[currentProblemNum-1].question+'Q.png'" class="center round-border-img" style="width: 65%"/>
    </IonItem>
    <div style="width: 95%" class="center">
      <span hidden>
      {{ choice1 = Number(problems[currentProblemNum - 1].choice1)-1}}
      {{ choice2 = Number(problems[currentProblemNum - 1].choice2)-1}}
      {{ choice3 = Number(problems[currentProblemNum - 1].choice3)-1}}
      {{ choice4 = Number(problems[currentProblemNum - 1].choice4)-1}}
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
  toastController,
  alertController,
} from "@ionic/vue";
import {chevronForward, listCircle, pauseCircleOutline, playCircleOutline} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useData from '@/hooks/useData'
import {useI18n} from "vue-i18n";
import MultipleChoiceSignResultPage from '@/views/MultipleChoiceSignResultPage.vue'
import dataSource from "@/json/dataSource.json"
import useAudio from "@/hooks/useAudio";

const {playSignAudio, pauseAudio, isPlayingSignAudio} = useAudio();
const {t} = useI18n();
const multipleChoiceSignResultPage = markRaw(MultipleChoiceSignResultPage);

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
          localStorage.setItem('multipleChoiceSignProblems',JSON.stringify(problems));
          localStorage.setItem('userMultipleChoiceSignValues',chooseAns.toString());
          chooseAns.splice(0);
          const navLink = document.querySelector('#goToMultipleChoiceSignResultPage');
          (navLink as HTMLElement).click();
        },
      }
    ],
    backdropDismiss: false,
  });

  await alert.present();
};

const {generateMultipleChoiceProblems, signCounts, DEFAULT_PROBLEM_COUNT} = useData()
const problemCounts = Number(localStorage.getItem('multipleChoiceSignCount')) || DEFAULT_PROBLEM_COUNT;
const problems = generateMultipleChoiceProblems(problemCounts, signCounts);

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

</script>

<style scoped>

</style>
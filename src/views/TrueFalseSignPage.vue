<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="checkmarkDone" style="padding-right: 10px"/>
        {{$t('sign')}}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <h3>{{ currentProblemNum }}/{{ problemCounts }}</h3>
    <IonCard>
      <IonCardContent>
        <IonIcon class="iconBtn" size="large" :icon="playCircleOutline" style="float: left" @click="playSignSound(Number(problems[currentProblemNum - 1].trueFalse)-1)"/>
        <IonItem color="transparent" lines="none">
          <IonImg :src="'images/sign/'+problems[currentProblemNum-1].question+'Q.png'" class="center round-border-img" style="width: 70%"/>
        </IonItem>
        <IonItem class="center" color="transparent" lines="none">
          <IonLabel style="color: black; display: block; margin: 0 auto; padding-bottom: 5px">{{ dataSource.signs[Number(problems[currentProblemNum-1].trueFalse)-1].A }}</IonLabel>
        </IonItem>
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
    <IonNavLink id='goToTrueFalseSignResultPage' routerDirection="forward" :component="trueFalseSignResultPage">
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
  IonCard,
  IonCardContent,
  toastController,
  alertController, IonLabel,
} from "@ionic/vue";
import {checkmarkDone, chevronForward, playCircleOutline} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useData from '@/hooks/useData';
import {useI18n} from "vue-i18n";
import TrueFalseSignResultPage from '@/views/TrueFalseSignResultPage.vue'
import dataSource from "@/json/dataSource.json";
import useSound from "@/hooks/useSound";

const {playSignSound} = useSound();
const {t} = useI18n();
const trueFalseSignResultPage = markRaw(TrueFalseSignResultPage);

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
          localStorage.setItem('trueFalseSignProblems',JSON.stringify(problems));
          localStorage.setItem('userTrueFalseSignValues',chooseAns.toString());
          chooseAns.splice(0);
          const navLink = document.querySelector('#goToTrueFalseSignResultPage');
          (navLink as HTMLElement).click();
        },
      }
    ],
    backdropDismiss: false,
  });

  await alert.present();
};

const {generateTrueFalseProblem, signCounts, DEFAULT_PROBLEM_COUNT} = useData()
const problemCounts = Number(localStorage.getItem('trueFalseSignCount')) || DEFAULT_PROBLEM_COUNT;
const problems = generateTrueFalseProblem(problemCounts, signCounts);

let currentSelectedValue = ref('');
let currentProblemNum = ref(1);
let chooseAns: string[] = [];
const onClickBackButton = () => {
}

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

</script>

<style scoped>

</style>
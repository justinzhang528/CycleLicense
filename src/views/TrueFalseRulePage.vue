<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="listCircle" style="padding-right: 10px"/>
        {{ $t('trueFalseRule') }}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <h3>{{ currentProblemNum }}/{{ problemCounts }}</h3>
    <IonCard>
      <IonCardContent align="left">
        <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('question')}} {{$t(':')}}</IonLabel>
        <IonLabel style="color: black;">{{ dataSource.rules[Number(problems[currentProblemNum - 1].question)-1].Q }}</IonLabel><br><br>
        <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('answer')}} {{$t(':')}} </IonLabel>
        <IonLabel style="color: black;">{{ dataSource.rules[Number(problems[currentProblemNum - 1].trueFalse)-1].A }}</IonLabel>
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
  IonCard,
} from "@ionic/vue";
import {chevronForward, listCircle} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useImageData from '@/hooks/useImageData';
import {useI18n} from "vue-i18n";
import TrueFalseRuleResultPage from '@/views/TrueFalseRuleResultPage.vue'
import dataSource from '@/json/dataSource.json'

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

const {generateTrueFalseProblem, ruleCounts} = useImageData()
const problemCounts = 2;
const problems = generateTrueFalseProblem(problemCounts, ruleCounts);

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
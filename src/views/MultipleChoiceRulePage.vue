<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="listCircle" style="padding-right: 10px"/>
        {{$t('multipleChoiceRule')}}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <h3>{{ currentProblemNum }}/{{ problemCounts }}</h3>
    <IonItem color="transparent" class="center" lines="none">
      <IonLabel style="color: black;">{{rule.rules[Number(problems[currentProblemNum-1].question)].Q}}</IonLabel>
    </IonItem>
    <div style="width: 90%" class="center">
      <IonRadioGroup class='content-center' :value="currentSelectedValue" @ionChange="onRadioSelectedChange">
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("1")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{rule.rules[Number(problems[currentProblemNum-1].choice1)].A}}</label>
          <IonRadio mode="md" value="1"></IonRadio>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("2")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{rule.rules[Number(problems[currentProblemNum-1].choice2)].A}}</label>
          <IonRadio mode="md" value="2"></IonRadio>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("3")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{rule.rules[Number(problems[currentProblemNum-1].choice3)].A}}</label>
          <IonRadio mode="md" value="3"></IonRadio>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("4")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{rule.rules[Number(problems[currentProblemNum-1].choice4)].A}}</label>
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
  IonImg,
  toastController,
  alertController, IonLabel,
} from "@ionic/vue";
import {chevronForward, listCircle} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useImageData from '@/hooks/useImageData'
import {useI18n} from "vue-i18n";
import MultipleChoiceRuleResultPage from '@/views/MultipleChoiceRuleResultPage.vue'
import rule from '@/json/rules.json'

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

const {generateMultipleChoiceProblems, ruleImageCounts} = useImageData()
const problemCounts = 2;
const problems = generateMultipleChoiceProblems(problemCounts, ruleImageCounts);

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
<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="listCircle" style="padding-right: 10px"/>
        True/False Sign
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <h3>{{ currentProblemNum }}/{{ problemCounts }}</h3>
    <IonItem color="transparent" lines="none">
      <IonImg :src="problems[currentProblemNum-1].questionPath" class="center round-border-img" style="width: 70%"/>
    </IonItem>
    <IonItem color="transparent" lines="none">
      <IonImg :src="problems[currentProblemNum-1].trueFalsePath" class="center round-border-img" style="width: 90%"/>
    </IonItem>
    <div style="width: 90%" class="center">
      <IonRadioGroup class='content-center' :value="currentSelectedValue" @ionChange="onRadioSelectedChange">
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <h5 class="center" style="width: 100%">မှန်</h5>
          <IonRadio mode="md" value="1"></IonRadio>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <h5 class="center" style="width: 100%">မှား</h5>
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
  toastController,
  alertController,
} from "@ionic/vue";
import {chevronForward, listCircle} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useImageData from '@/hooks/useImageData'
import TrueFalseSignResultPage from '@/views/TrueFalseSignResultPage.vue'

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

const {generateTrueFalseProblem, signImageCounts} = useImageData()
const problemCounts = 2;
const problems = generateTrueFalseProblem(problemCounts, signImageCounts, 'sign');

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
    showToast('ကျေးဇူးပြု၍ အဖြေရွေးပါ');
    return;
  }
  chooseAns.push(currentSelectedValue.value);
  if (currentProblemNum.value >= problemCounts) {
    showFinishAlert("Test Finish!", "", "", "View Result")
    return;
  }
  currentSelectedValue.value = '';
  currentProblemNum.value += 1;
}

</script>

<style scoped>

</style>
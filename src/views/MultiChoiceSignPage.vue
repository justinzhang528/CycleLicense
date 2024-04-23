<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="listCircle" style="padding-right: 10px"/>
        Multiple Choice Sign
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <h3>{{ currentProblemNum }}/{{ problemCounts }}</h3>
    <IonItem color="transparent" lines="none">
      <IonImg :src="problems[currentProblemNum-1].questionPath" class="center round-border-img" style="width: 65%"/>
    </IonItem>
    <div style="width: 90%" class="center">
      <IonRadioGroup class='content-center' :value="currentSelectedValue" @ionChange="onRadioSelectedChange">
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          1.&nbsp;&nbsp;<IonImg :src="problems[currentProblemNum-1].choice1Path" class="center round-border-img"
                                style="padding-right: 5px"/>
          <IonRadio style="float: right" mode="md" value="1"></IonRadio>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          2.&nbsp;&nbsp;<IonImg :src="problems[currentProblemNum-1].choice2Path" class="center round-border-img"
                                style="padding-right: 5px"/>
          <IonRadio style="float: right" mode="md" value="2"></IonRadio>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          3.&nbsp;&nbsp;<IonImg :src="problems[currentProblemNum-1].choice3Path" class="center round-border-img"
                                style="padding-right: 5px"/>
          <IonRadio style="float: right" mode="md" value="3"></IonRadio>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          4.&nbsp;&nbsp;<IonImg :src="problems[currentProblemNum-1].choice4Path" class="center round-border-img"
                                style="padding-right: 5px"/>
          <IonRadio style="float: right" mode="md" value="4"></IonRadio>
        </IonItem>
      </IonRadioGroup>
    </div>
    <IonButton :onClick="onClickNextButton" color="dark" shape="round">
      <IonIcon :icon="chevronForward"/>
    </IonButton>
    <IonNavLink id='goToMultiChoiceSignResultPage' routerDirection="forward" :component="multiChoiceSignResultPage">
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
import MultiChoiceSignResultPage from '@/views/MultiChoiceSignResultPage.vue'

const multiChoiceSignResultPage = markRaw(MultiChoiceSignResultPage);

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
          localStorage.setItem('choiceSignProblems',JSON.stringify(problems));
          localStorage.setItem('userChoiceSignValues',chooseAns.toString());
          chooseAns.splice(0);
          const navLink = document.querySelector('#goToMultiChoiceSignResultPage');
          (navLink as HTMLElement).click();
        },
      }
    ],
    backdropDismiss: false,
  });

  await alert.present();
};

const {generateChoiceProblems, signImageCounts} = useImageData()
const problemCounts = 2;
const problems = generateChoiceProblems(problemCounts, signImageCounts, 'sign');

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
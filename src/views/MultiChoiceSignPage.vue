<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle>
        <IonIcon :icon="listCircle" style="padding-right: 10px"/>
        Multiple Choice Sign
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-text-center">
    <h3>{{ currentProblemNum }}/{{ problemCounts }}</h3>
    <IonRadioGroup class='content-center' :value="currentSelectedValue" @ionChange="onRadioSelectedChange">
      <IonItem color="transparent" lines="none">
        <IonImg :src="problems[currentProblemNum-1].questionPath" class="center round-border-img" style="width: 65%"/>
      </IonItem>
      <br>
      <IonItem color="transparent" class="center ion-item-border" lines="none">
        1.&nbsp;&nbsp;<IonImg :src="problems[currentProblemNum-1].choice1Path" class="center round-border-img"
                              style="padding-right: 5px"/>
        <br>
        <IonRadio style="float: right" value="1"></IonRadio>
      </IonItem>
      <br>
      <IonItem color="transparent" class="center ion-item-border" lines="none">
        2.&nbsp;&nbsp;<IonImg :src="problems[currentProblemNum-1].choice2Path" class="center round-border-img"
                              style="padding-right: 5px"/>
        <IonRadio style="float: right" value="2"></IonRadio>
      </IonItem>
      <br>
      <IonItem color="transparent" class="center ion-item-border" lines="none">
        3.&nbsp;&nbsp;<IonImg :src="problems[currentProblemNum-1].choice3Path" class="center round-border-img"
                              style="padding-right: 5px"/>
        <IonRadio style="float: right" value="3"></IonRadio>
      </IonItem>
      <br>
      <IonItem color="transparent" class="center ion-item-border" lines="none">
        4.&nbsp;&nbsp;<IonImg :src="problems[currentProblemNum-1].choice4Path" class="center round-border-img"
                              style="padding-right: 5px"/>
        <IonRadio style="float: right" value="4"></IonRadio>
      </IonItem>
    </IonRadioGroup>
    <br>
    <IonButton :onClick="onClickNextButton" color="dark" shape="round">
      <IonIcon :icon="chevronForward"/>
    </IonButton>
    <IonNavLink id='goToChoiceSignResultPage' routerDirection="forward">
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
} from "@ionic/vue";
import {chevronForward, listCircle} from "ionicons/icons";
import {reactive, ref} from "vue";
import useImageData from '@/hooks/useImageData'

const showToast = async (msg: string) => {
  const toast = await toastController.create({
    message: msg,
    duration: 300,
    position: 'bottom',
  });
  await toast.present();
}

const {generateChoiceProblems, signImageCounts} = useImageData()
const problemCounts = 5;
const problems = generateChoiceProblems(problemCounts, signImageCounts, 'sign');

var currentSelectedValue = ref('');
var currentProblemNum = ref(1);
var chooseAns = [];
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
  chooseAns.push(currentSelectedValue);
  if (currentProblemNum.value >= problemCounts) {
    return;
  }
  currentSelectedValue.value = '';
  currentProblemNum.value += 1;
}

</script>

<style scoped>

</style>
<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" :onclick="onClickBackButton">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="listCircle" style="padding-right: 10px"/>
        {{$t('multipleChoiceSign')}}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <h3>{{ currentProblemNum }}/{{ problemCounts }}</h3>
    <IonItem color="transparent" lines="none">
      <IonImg :src="'images/sign/'+problems[currentProblemNum-1].question+'Q.png'" class="center round-border-img" style="width: 65%"/>
    </IonItem>
    <div style="width: 90%" class="center">
      <IonRadioGroup class='content-center' :value="currentSelectedValue" @ionChange="onRadioSelectedChange">
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          {{$t("1")}}{{$t(".")}}&nbsp;&nbsp;<IonImg :src="'images/sign/'+problems[currentProblemNum-1].choice1+'A.png'" class="center round-border-img"
                                style="padding-right: 5px"/>
          <IonRadio mode="md" value="1"></IonRadio>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          {{$t("2")}}{{$t(".")}}&nbsp;&nbsp;<IonImg :src="'images/sign/'+problems[currentProblemNum-1].choice2+'A.png'" class="center round-border-img"
                                style="padding-right: 5px"/>
          <IonRadio mode="md" value="2"></IonRadio>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          {{$t("3")}}{{$t(".")}}&nbsp;&nbsp;<IonImg :src="'images/sign/'+problems[currentProblemNum-1].choice3+'A.png'" class="center round-border-img"
                                style="padding-right: 5px"/>
          <IonRadio mode="md" value="3"></IonRadio>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          {{$t("4")}}{{$t(".")}}&nbsp;&nbsp;<IonImg :src="'images/sign/'+problems[currentProblemNum-1].choice4+'A.png'" class="center round-border-img"
                                style="padding-right: 5px"/>
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
import {chevronForward, listCircle} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useImageData from '@/hooks/useImageData'
import {useI18n} from "vue-i18n";
import MultipleChoiceSignResultPage from '@/views/MultipleChoiceSignResultPage.vue'

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

const {generateMultipleChoiceProblems, signCounts} = useImageData()
const problemCounts = Number(localStorage.getItem('multipleChoiceSignCount')) || 10;
const problems = generateMultipleChoiceProblems(problemCounts, signCounts);

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
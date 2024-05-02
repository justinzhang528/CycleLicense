<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="checkmarkDone" style="padding-right: 10px"/>
        {{$t('sign')}}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-text-center">
    <div v-if="isShowSetting">
      <img :src="'images/trueFalse.png'" alt="trueFalse" style="width: 75%"/>
      <h5 style="padding-bottom: 15px">{{$t('setTheNumberOfQuestions')}}</h5>
      <IonItem class="center">
        <IonLabel>{{$t('trueFalseSign')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.signs.length}})</p></IonLabel>
        <IonButton color="dark" @click="onClickDecrement">-</IonButton>
        <IonInput style="width: 25%" type="number" :readonly="true" v-model="problemCounts"></IonInput>
        <IonButton color="dark" @click="onClickIncrement">+</IonButton>
      </IonItem><br>
      <IonButton :onClick="onClickStartTesting" color="dark" shape="round">
        {{$t('startTesting')}}
      </IonButton>
    </div>

    <div v-if="!isShowSetting" class="ion-padding">
      <h3>{{ currentProblemNum }}/{{ problemCounts }}</h3>
      <IonCard>
        <IonCardContent>
          <span hidden>{{ trueFalse = Number(problems[currentProblemNum - 1].trueFalse)-1}}</span>
          <IonIcon color="dark" v-if="!isPlayingSignAudio[trueFalse]" size="large" style="float: left" :icon="playCircleOutline" @click="onClickPlayAudio(trueFalse)"/>
          <IonIcon color="dark" v-if="isPlayingSignAudio[trueFalse]" size="large" style="float: left" :icon="pauseCircleOutline" @click="onClickPlayAudio(trueFalse)"/>
          <IonItem color="transparent" lines="none">
            <IonImg :src="'images/sign/'+problems[currentProblemNum-1].question+'Q.png'" class="center round-border-img" style="width: 70%"/>
          </IonItem>
          <IonItem class="center" color="transparent" lines="none">
            <IonLabel color="dark" style="display: block; margin: 0 auto; padding-bottom: 5px">{{ dataSource.signs[trueFalse].A }}</IonLabel>
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
  IonImg,
  IonCard,
  IonCardContent,
  toastController,
  alertController, IonLabel, IonInput,
} from "@ionic/vue";
import {checkmarkDone, chevronForward, playCircleOutline, pauseCircleOutline} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useData from '@/hooks/useData';
import {useI18n} from "vue-i18n";
import TrueFalseSignResultPage from '@/views/TrueFalseSignResultPage.vue'
import dataSource from "@/json/dataSource.json";
import useAudio from "@/hooks/useAudio";

const {playSignAudio, isPlayingSignAudio, pauseAudio} = useAudio();
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

const {generateTrueFalseProblem, signCounts} = useData()
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

const onClickStartTesting = ()=>{
  if(problemCounts.value < 1 || problemCounts.value > dataSource.signs.length){
    showAlert(t('warning'), '', t('invalidQuestionNumber'), t('confirm'));
    return;
  }
  problems =  generateTrueFalseProblem(problemCounts.value, signCounts);
  isShowSetting.value = false;
}

const onClickDecrement = ()=>{
  if(problemCounts.value > 5)
    problemCounts.value-=5;
}

const onClickIncrement = ()=>{
  if(problemCounts.value < dataSource.signs.length)
    problemCounts.value+=5;
}
</script>

<style scoped>

</style>
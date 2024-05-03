<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        {{$t('comprehensiveTest')}}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-text-center">

    <div v-if="isShowSetting">
      <img :src="'images/comprehensiveTest.png'" alt="multipleChoice" style="width: 65%"/>
      <h5 style="padding-bottom: 15px">{{$t('setTheNumberOfQuestions')}}</h5>
      <IonItem class="center">
        <IonLabel>{{$t('multipleChoiceSign')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.signs.length}})</p></IonLabel>
        <IonButton color="dark" @click="onClickDecrementMultipleChoiceSign">-</IonButton>
        <IonInput style="width: 25%" type="number" :readonly="true" v-model="multipleChoiceSignProblemCounts"></IonInput>
        <IonButton color="dark" @click="onClickIncrementMultipleChoiceSign">+</IonButton>
      </IonItem>
      <IonItem class="center">
        <IonLabel>{{$t('multipleChoiceRule')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.rules.length}})</p></IonLabel>
        <IonButton color="dark" @click="onClickDecrementMultipleChoiceRule">-</IonButton>
        <IonInput style="width: 25%" type="number" :readonly="true" v-model="multipleChoiceRuleProblemCounts"></IonInput>
        <IonButton color="dark" @click="onClickIncrementMultipleChoiceRule">+</IonButton>
      </IonItem>
      <IonItem class="center">
        <IonLabel>{{$t('trueFalseSign')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.signs.length}})</p></IonLabel>
        <IonButton color="dark" @click="onClickDecrementTrueFalseSign">-</IonButton>
        <IonInput style="width: 25%" type="number" :readonly="true" v-model="trueFalseSignProblemCounts"></IonInput>
        <IonButton color="dark" @click="onClickIncrementTrueFalseSign">+</IonButton>
      </IonItem>
      <IonItem class="center">
        <IonLabel>{{$t('trueFalseRule')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.rules.length}})</p></IonLabel>
        <IonButton color="dark" @click="onClickDecrementTrueFalseRule">-</IonButton>
        <IonInput style="width: 25%" type="number" :readonly="true" v-model="trueFalseRuleProblemCounts"></IonInput>
        <IonButton color="dark" @click="onClickIncrementTrueFalseRule">+</IonButton>
      </IonItem><br>
      <IonButton :onClick="onClickStartTesting" color="dark" shape="round">
        {{$t('startTesting')}}
      </IonButton>
    </div>

    <div v-if="!isShowSetting" class="ion-padding">
      <h3>{{ currentProblemNum }}/{{ totalProblemCounts }}</h3>

      <span hidden>
        {{ question = Number(problems[currentProblemNum - 1].data.question)-1}}
        {{ choice1 = Number(problems[currentProblemNum - 1].data.choice1)-1}}
        {{ choice2 = Number(problems[currentProblemNum - 1].data.choice2)-1}}
        {{ choice3 = Number(problems[currentProblemNum - 1].data.choice3)-1}}
        {{ choice4 = Number(problems[currentProblemNum - 1].data.choice4)-1}}
        {{ question = Number(problems[currentProblemNum - 1].data.question)-1}}
        {{ trueFalse = Number(problems[currentProblemNum - 1].data.trueFalse)-1}}
      </span>

      <div v-if="problems[currentProblemNum - 1].type === 'multipleChoiceSign'">
        <IonItem color="transparent" lines="none">
          <IonImg :src="'images/sign/'+problems[currentProblemNum-1].data.question+'Q.png'" class="center round-border-img" style="width: 65%"/>
        </IonItem>
        <div style="width: 95%" class="center">
          <IonRadioGroup class='content-center' :value="currentSelectedValue" @ionChange="onRadioSelectedChange">
            <IonItem color="transparent" class="center ion-item-border" lines="none">
              <IonIcon color="dark" v-if="!isPlayingSignAudio[choice1]" size="large" :icon="playCircleOutline" @click="onClickPlaySignAudio(choice1)"/>
              <IonIcon color="dark" v-if="isPlayingSignAudio[choice1]" size="large" :icon="pauseCircleOutline" @click="onClickPlaySignAudio(choice1)"/>
              <label style="font-weight: bold"> ({{$t("1")}})&nbsp;&nbsp;</label>
              <label style="width: 100%">{{ dataSource.signs[choice1].A }}</label>
              <IonRadio mode="md" value="1"></IonRadio>
            </IonItem>
            <IonItem color="transparent" class="center ion-item-border" lines="none">
              <IonIcon color="dark" v-if="!isPlayingSignAudio[choice2]" size="large" :icon="playCircleOutline" @click="onClickPlaySignAudio(choice2)"/>
              <IonIcon color="dark" v-if="isPlayingSignAudio[choice2]" size="large" :icon="pauseCircleOutline" @click="onClickPlaySignAudio(choice2)"/>
              <label style="font-weight: bold"> ({{$t("2")}})&nbsp;&nbsp;</label>
              <label style="width: 100%">{{ dataSource.signs[choice2].A }}</label>
              <IonRadio mode="md" value="2"></IonRadio>
            </IonItem>
            <IonItem color="transparent" class="center ion-item-border" lines="none">
              <IonIcon color="dark" v-if="!isPlayingSignAudio[choice3]" size="large" :icon="playCircleOutline" @click="onClickPlaySignAudio(choice3)"/>
              <IonIcon color="dark" v-if="isPlayingSignAudio[choice3]" size="large" :icon="pauseCircleOutline" @click="onClickPlaySignAudio(choice3)"/>
              <label style="font-weight: bold"> ({{$t("3")}})&nbsp;&nbsp;</label>
              <label style="width: 100%">{{ dataSource.signs[choice3].A }}</label>
              <IonRadio mode="md" value="3"></IonRadio>
            </IonItem>
            <IonItem color="transparent" class="center ion-item-border" lines="none">
              <IonIcon color="dark" v-if="!isPlayingSignAudio[choice4]" size="large" :icon="playCircleOutline" @click="onClickPlaySignAudio(choice4)"/>
              <IonIcon color="dark" v-if="isPlayingSignAudio[choice4]" size="large" :icon="pauseCircleOutline" @click="onClickPlaySignAudio(choice4)"/>
              <label style="font-weight: bold"> ({{$t("4")}})&nbsp;&nbsp;</label>
              <label style="width: 100%">{{ dataSource.signs[choice4].A }}</label>
              <IonRadio mode="md" value="4"></IonRadio>
            </IonItem>
          </IonRadioGroup>
        </div>
      </div>

      <div v-if="problems[currentProblemNum - 1].type === 'multipleChoiceRule'">
        <IonCard>
          <IonCardContent>
            <IonItem color="transparent" class="center" lines="none">
              <IonIcon color="dark" v-if="!isPlayingRuleQuestionAudio[question]" size="large" :icon="playCircleOutline" @click="onClickPlayRuleQuestionAudio(question)"/>
              <IonIcon color="dark" v-if="isPlayingRuleQuestionAudio[question]" size="large" :icon="pauseCircleOutline" @click="onClickPlayRuleQuestionAudio(question)"/>
              <IonLabel color="dark">{{ dataSource.rules[Number(problems[currentProblemNum - 1].data.question)-1].Q }}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <div style="width: 90%" class="center">
          <IonRadioGroup class='content-center' :value="currentSelectedValue" @ionChange="onRadioSelectedChange">
            <IonItem color="transparent" class="center ion-item-border" lines="none">
              <IonIcon color="dark" v-if="!isPlayingRuleAnswerAudio[choice1]" size="large" :icon="playCircleOutline" @click="onClickPlayRuleAnswerAudio(choice1)"/>
              <IonIcon color="dark" v-if="isPlayingRuleAnswerAudio[choice1]" size="large" :icon="pauseCircleOutline" @click="onClickPlayRuleAnswerAudio(choice1)"/>
              <label style="font-weight: bold"> ({{$t("1")}})&nbsp;&nbsp;</label>
              <label style="width: 100%">{{ dataSource.rules[choice1].A }}</label>
              <IonRadio mode="md" value="1"></IonRadio>
            </IonItem>
            <IonItem color="transparent" class="center ion-item-border" lines="none">
              <IonIcon color="dark" v-if="!isPlayingRuleAnswerAudio[choice2]" size="large" :icon="playCircleOutline" @click="onClickPlayRuleAnswerAudio(choice2)"/>
              <IonIcon color="dark" v-if="isPlayingRuleAnswerAudio[choice2]" size="large" :icon="pauseCircleOutline" @click="onClickPlayRuleAnswerAudio(choice2)"/>
              <label style="font-weight: bold"> ({{$t("2")}})&nbsp;&nbsp;</label>
              <label style="width: 100%">{{ dataSource.rules[choice2].A }}</label>
              <IonRadio mode="md" value="2"></IonRadio>
            </IonItem>
            <IonItem color="transparent" class="center ion-item-border" lines="none">
              <IonIcon color="dark" v-if="!isPlayingRuleAnswerAudio[choice3]" size="large" :icon="playCircleOutline" @click="onClickPlayRuleAnswerAudio(choice3)"/>
              <IonIcon color="dark" v-if="isPlayingRuleAnswerAudio[choice3]" size="large" :icon="pauseCircleOutline" @click="onClickPlayRuleAnswerAudio(choice3)"/>
              <label style="font-weight: bold"> ({{$t("3")}})&nbsp;&nbsp;</label>
              <label style="width: 100%">{{ dataSource.rules[choice3].A }}</label>
              <IonRadio mode="md" value="3"></IonRadio>
            </IonItem>
            <IonItem color="transparent" class="center ion-item-border" lines="none">
              <IonIcon color="dark" v-if="!isPlayingRuleAnswerAudio[choice4]" size="large" :icon="playCircleOutline" @click="onClickPlayRuleAnswerAudio(choice4)"/>
              <IonIcon color="dark" v-if="isPlayingRuleAnswerAudio[choice4]" size="large" :icon="pauseCircleOutline" @click="onClickPlayRuleAnswerAudio(choice4)"/>
              <label style="font-weight: bold"> ({{$t("4")}})&nbsp;&nbsp;</label>
              <label style="width: 100%">{{ dataSource.rules[choice4].A }}</label>
              <IonRadio mode="md" value="4"></IonRadio>
            </IonItem>
          </IonRadioGroup>
        </div>
      </div>

      <div v-if="problems[currentProblemNum - 1].type === 'trueFalseSign'">
        <IonCard>
          <IonCardContent>
            <IonIcon color="dark" v-if="!isPlayingSignAudio[trueFalse]" size="large" style="float: left" :icon="playCircleOutline" @click="onClickPlaySignAudio(trueFalse)"/>
            <IonIcon color="dark" v-if="isPlayingSignAudio[trueFalse]" size="large" style="float: left" :icon="pauseCircleOutline" @click="onClickPlaySignAudio(trueFalse)"/>
            <IonItem color="transparent" lines="none">
              <IonImg :src="'images/sign/'+problems[currentProblemNum-1].data.question+'Q.png'" class="center round-border-img" style="width: 70%"/>
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
      </div>

      <div v-if="problems[currentProblemNum - 1].type === 'trueFalseRule'">
        <IonCard>
          <IonCardContent align="left">
            <IonIcon color="dark" v-if="!isPlayingRuleQuestionAudio[question]" size="large" :icon="playCircleOutline" @click="onClickPlayRuleQuestionAudio(question)"/>
            <IonIcon color="dark" v-if="isPlayingRuleQuestionAudio[question]" size="large" :icon="pauseCircleOutline" @click="onClickPlayRuleQuestionAudio(question)"/>
            <IonLabel color="dark" style="font-weight: bold; padding-right: 5px">{{$t('question')}} {{$t(':')}}</IonLabel>
            <IonLabel color="dark">{{ dataSource.rules[question].Q }}</IonLabel><br><br>
            <IonIcon color="dark" v-if="!isPlayingRuleAnswerAudio[trueFalse]" size="large" :icon="playCircleOutline" @click="onClickPlayRuleAnswerAudio(trueFalse)"/>
            <IonIcon color="dark" v-if="isPlayingRuleAnswerAudio[trueFalse]" size="large" :icon="pauseCircleOutline" @click="onClickPlayRuleAnswerAudio(trueFalse)"/>
            <IonLabel color="dark" style="font-weight: bold; padding-right: 5px">{{$t('answer')}} {{$t(':')}} </IonLabel>
            <IonLabel color="dark">{{ dataSource.rules[trueFalse].A }}</IonLabel>
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
      </div>

      <IonButton :onClick="onClickNextButton" color="dark" shape="round">
        <IonIcon :icon="chevronForward"/>
      </IonButton>
      <IonNavLink id='goToComprehensiveTestResultPage' routerDirection="forward" :component="comprehensiveTestResultPage">
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
  IonInput,
  IonLabel, IonCardContent, IonCard,
} from "@ionic/vue";
import {chevronForward, pauseCircleOutline, playCircleOutline} from "ionicons/icons";
import {markRaw, ref} from "vue";
import useData from '@/hooks/useData'
import {useI18n} from "vue-i18n";
import ComprehensiveTestResultPage from '@/views/ComprehensiveTestResultPage.vue'
import dataSource from "@/json/dataSource.json"
import useAudio from "@/hooks/useAudio";
import {showToast, showFinishAlert, showAlert, shuffleArray} from "@/hooks/useUtils";

const {playSignAudio, playRuleQuestionAudio, playRuleAnswerAudio, pauseAudio, isPlayingSignAudio, isPlayingRuleAnswerAudio, isPlayingRuleQuestionAudio} = useAudio();
const {t} = useI18n();
const comprehensiveTestResultPage = markRaw(ComprehensiveTestResultPage);
const isShowSetting = ref(true);
const multipleChoiceSignProblemCounts = ref(10);
const multipleChoiceRuleProblemCounts = ref(10);
const trueFalseSignProblemCounts = ref(10);
const trueFalseRuleProblemCounts = ref(10);
const totalProblemCounts = ref(40);

const {generateMultipleChoiceProblems, generateTrueFalseProblem, signCounts, ruleCounts} = useData()
let problems: any[] = [];

let currentSelectedValue = ref('');
let currentProblemNum = ref(1);
let chooseAns: string[] = [];

const onRadioSelectedChange = (e: CustomEvent) => {
  currentSelectedValue.value = e.detail.value;
}

const onClickFinishConfirm = ()=>{
  currentSelectedValue.value = '';
  currentProblemNum.value = 1;
  localStorage.setItem('comprehensiveTestProblems',JSON.stringify(problems));
  localStorage.setItem('comprehensiveTestUserChooseValues',chooseAns.toString());
  chooseAns.splice(0);
  const navLink = document.querySelector('#goToComprehensiveTestResultPage');
  (navLink as HTMLElement).click();
}

const onClickNextButton = () => {
  if (currentSelectedValue.value === '') {
    showToast(t('pleaseChooseAnswer'));
    return;
  }
  chooseAns.push(currentSelectedValue.value);
  if (currentProblemNum.value >= totalProblemCounts.value) {
    showFinishAlert(t('testFinish'), "", "", t("viewResult"), onClickFinishConfirm)
    return;
  }
  currentSelectedValue.value = '';
  currentProblemNum.value += 1;
  console.log(chooseAns)
}

const onClickPlaySignAudio = (n: number) => {
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

const onClickPlayRuleQuestionAudio = (n: number) => {
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

const onClickPlayRuleAnswerAudio = (n: number) => {
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

const onClickStartTesting = ()=>{
  if(multipleChoiceSignProblemCounts.value < 1 || multipleChoiceSignProblemCounts.value > dataSource.signs.length){
    showAlert(t('warning'), t('invalidQuestionNumber'), t('rangeMustBe')+' 1 ~ '+dataSource.signs.length, t('confirm'));
    return;
  }
  if(multipleChoiceRuleProblemCounts.value < 1 || multipleChoiceRuleProblemCounts.value > dataSource.rules.length){
    showAlert(t('warning'), t('invalidQuestionNumber'), t('rangeMustBe')+' 1 ~ '+dataSource.rules.length, t('confirm'));
    return;
  }
  if(trueFalseSignProblemCounts.value < 1 || trueFalseSignProblemCounts.value > dataSource.signs.length){
    showAlert(t('warning'), t('invalidQuestionNumber'), t('rangeMustBe')+' 1 ~ '+dataSource.signs.length, t('confirm'));
    return;
  }
  if(trueFalseRuleProblemCounts.value < 1 || trueFalseRuleProblemCounts.value > dataSource.rules.length){
    showAlert(t('warning'), t('invalidQuestionNumber'), t('rangeMustBe')+' 1 ~ '+dataSource.rules.length, t('confirm'));
    return;
  }

  const multipleChoiceSignProblems =  generateMultipleChoiceProblems(multipleChoiceSignProblemCounts.value, signCounts, 'multipleChoiceSign');
  const multipleChoiceRuleProblems =  generateMultipleChoiceProblems(multipleChoiceRuleProblemCounts.value, ruleCounts, 'multipleChoiceRule');
  const trueFalseSignProblems =  generateTrueFalseProblem(trueFalseSignProblemCounts.value, signCounts, 'trueFalseSign');
  const trueFalseRuleProblems =  generateTrueFalseProblem(trueFalseRuleProblemCounts.value, ruleCounts, 'trueFalseRule');
  for (let i = 0; i < multipleChoiceSignProblems.length; i++) {
    problems.push(multipleChoiceSignProblems[i]);
  }
  for (let i = 0; i < multipleChoiceRuleProblems.length; i++) {
    problems.push(multipleChoiceRuleProblems[i]);
  }
  for (let i = 0; i < trueFalseSignProblems.length; i++) {
    problems.push(trueFalseSignProblems[i]);
  }
  for (let i = 0; i < trueFalseRuleProblems.length; i++) {
    problems.push(trueFalseRuleProblems[i]);
  }
  problems = shuffleArray(problems);
  totalProblemCounts.value = multipleChoiceSignProblemCounts.value+multipleChoiceRuleProblemCounts.value+trueFalseSignProblemCounts.value+trueFalseRuleProblemCounts.value;
  console.log(problems)
  isShowSetting.value = false;
}

const onClickDecrementMultipleChoiceSign = ()=>{
  if(multipleChoiceSignProblemCounts.value > 5)
    multipleChoiceSignProblemCounts.value-=5;
}

const onClickIncrementMultipleChoiceSign = ()=>{
  if(multipleChoiceSignProblemCounts.value < dataSource.signs.length)
    multipleChoiceSignProblemCounts.value+=5;
}

const onClickDecrementMultipleChoiceRule = ()=>{
  if(multipleChoiceRuleProblemCounts.value > 5)
    multipleChoiceRuleProblemCounts.value-=5;
}

const onClickIncrementMultipleChoiceRule = ()=>{
  if(multipleChoiceRuleProblemCounts.value < dataSource.rules.length)
    multipleChoiceRuleProblemCounts.value+=5;
}

const onClickDecrementTrueFalseSign = ()=>{
  if(trueFalseSignProblemCounts.value > 5)
    trueFalseSignProblemCounts.value-=5;
}

const onClickIncrementTrueFalseSign = ()=>{
  if(trueFalseSignProblemCounts.value < dataSource.signs.length)
    trueFalseSignProblemCounts.value+=5;
}

const onClickDecrementTrueFalseRule = ()=>{
  if(trueFalseRuleProblemCounts.value > 5)
    trueFalseRuleProblemCounts.value-=5;
}

const onClickIncrementTrueFalseRule = ()=>{
  if(trueFalseRuleProblemCounts.value < dataSource.rules.length)
    trueFalseRuleProblemCounts.value+=5;
}

</script>

<style scoped>

</style>
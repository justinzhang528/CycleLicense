<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="flask"></IonIcon>
        {{$t('result')}}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <h5>{{$t('totalScore')}} : {{ totalScore }}</h5>
    <IonCard v-for="(item,index) in problems" style="padding-bottom: 10px">
      <IonCardHeader>
        <IonCardSubtitle>{{ index + 1 }}/{{ problems.length }}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem color="transparent" class="center" lines="none">
          <IonLabel style="color: black;">{{rule.rules[Number(item.question)].Q}}</IonLabel>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("1")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{rule.rules[Number(item.choice1)].A}}</label>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("2")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{rule.rules[Number(item.choice2)].A}}</label>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("3")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{rule.rules[Number(item.choice3)].A}}</label>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("4")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{rule.rules[Number(item.choice4)].A}}</label>
        </IonItem>
        <IonLabel>
          {{$t('answer')}} {{$t(':')}} {{ $t(item.ans) }}
          ( {{$t('your')}}{{$t('answer')}} {{$t(':')}} {{ $t(chooseAns[index].toString()) }} )
          <IonIcon v-if="item.ans === chooseAns[index]" :icon="checkmark" style="color: green"></IonIcon>
          <IonIcon v-if="item.ans !== chooseAns[index]" :icon="close" style="color: red"></IonIcon>
        </IonLabel>
      </IonCardContent>

    </IonCard>
  </IonContent>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonItem,
  IonImg,
  IonLabel,
} from '@ionic/vue';
import {checkmark, close, flask} from "ionicons/icons";
import useImageData from "@/hooks/useImageData";
import rule from '@/json/rules.json'

const {getProblems, getTotalScore, getChooseAns} = useImageData();
const problems = getProblems('multipleChoiceRuleProblems');
const chooseAns = getChooseAns('userMultipleChoiceRuleValues');
const totalScore = getTotalScore('multipleChoiceRuleProblems', 'userMultipleChoiceRuleValues');

</script>

<style scoped>

</style>
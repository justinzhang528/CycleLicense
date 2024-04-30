<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :text="$t('back')"></IonBackButton>
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
          <IonLabel color="dark">{{ dataSource.rules[Number(item.question)-1].Q }}</IonLabel>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="font-weight: bold"> ({{$t("1")}})&nbsp;&nbsp;</label>
          <label style="width: 100%">{{ dataSource.rules[Number(item.choice1)-1].A }}</label>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="font-weight: bold"> ({{$t("2")}})&nbsp;&nbsp;</label>
          <label style="width: 100%">{{ dataSource.rules[Number(item.choice2)-1].A }}</label>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="font-weight: bold"> ({{$t("3")}})&nbsp;&nbsp;</label>
          <label style="width: 100%">{{ dataSource.rules[Number(item.choice3)-1].A }}</label>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="font-weight: bold"> ({{$t("4")}})&nbsp;&nbsp;</label>
          <label style="width: 100%">{{ dataSource.rules[Number(item.choice4)-1].A }}</label>
        </IonItem>
        <IonLabel>
          {{$t('answer')}} {{$t(':')}} {{ $t(item.ans) }}
          ( {{$t('your')}}{{$t('answer')}} {{$t(':')}} {{ $t(chooseAns[index].toString()) }} )<br>
          <IonIcon v-if="item.ans === chooseAns[index]" :icon="checkmark" size="large" style="color: green"></IonIcon>
          <IonIcon v-if="item.ans !== chooseAns[index]" :icon="close" size="large" style="color: red"></IonIcon>
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
  IonLabel,
} from '@ionic/vue';
import {checkmark, close, flask} from "ionicons/icons";
import useData from "@/hooks/useData";
import dataSource from '@/json/dataSource.json'

const {getProblems, getTotalScore, getChooseAns} = useData();
const problems = getProblems('multipleChoiceRuleProblems');
const chooseAns = getChooseAns('userMultipleChoiceRuleValues');
const totalScore = getTotalScore('multipleChoiceRuleProblems', 'userMultipleChoiceRuleValues');

</script>

<style scoped>

</style>
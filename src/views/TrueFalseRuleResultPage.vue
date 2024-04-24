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
        <div align="left">
          <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('question')}} {{$t(':')}}</IonLabel>
          <IonLabel style="color: black;">{{ dataSource.rules[Number(item.question)-1].Q }}</IonLabel><br><br>
          <IonLabel style="color: black; font-weight: bold; padding-right: 5px">{{$t('answer')}} {{$t(':')}} </IonLabel>
          <IonLabel style="color: black;">{{ dataSource.rules[Number(item.trueFalse)-1].A }}</IonLabel><br><br>
        </div>
        <IonLabel>
          {{$t('answer')}} {{$t(':')}} {{ item.ans === 1 ? $t('true') : $t('false') }}
          ( {{$t('your')}}{{$t('answer')}} {{$t(':')}} {{ chooseAns[index] === 1 ? $t('true') : $t('false') }} )<br>
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
  IonLabel,
} from '@ionic/vue';
import {checkmark, close, flask} from "ionicons/icons";
import useImageData from "@/hooks/useImageData";
import dataSource from "@/json/dataSource.json";

const {getProblems, getTotalScore, getChooseAns} = useImageData();
const problems = getProblems('trueFalseRuleProblems');
const chooseAns = getChooseAns('userTrueFalseRuleValues');
const totalScore = getTotalScore('trueFalseRuleProblems', 'userTrueFalseRuleValues');

</script>

<style scoped>

</style>
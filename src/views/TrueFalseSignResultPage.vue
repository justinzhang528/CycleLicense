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
        <IonItem color="transparent" lines="none">
          <IonImg class="center" :src="'images/sign/'+item.question+'Q.png'" style="width: 75%"/>
        </IonItem>
        <IonItem color="transparent" class="center" lines="none">
          <IonLabel style="color: black; padding-bottom: 5px">{{ dataSource.signs[Number(item.trueFalse)-1].A }}</IonLabel>
        </IonItem>
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
  IonItem,
  IonImg,
  IonLabel,
} from '@ionic/vue';
import {checkmark, close, flask} from "ionicons/icons";
import useData from "@/hooks/useData";
import dataSource from "@/json/dataSource.json";

const {getProblems, getTotalScore, getChooseAns} = useData();
const problems = getProblems('trueFalseSignProblems');
const chooseAns = getChooseAns('userTrueFalseSignValues');
const totalScore = getTotalScore('trueFalseSignProblems', 'userTrueFalseSignValues');

</script>

<style scoped>

</style>
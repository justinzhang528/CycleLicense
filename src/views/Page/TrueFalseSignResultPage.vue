<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :text="$t('back')"></IonBackButton>
      </IonButtons>
      <IonButtons slot="end">
        <IonMenuButton></IonMenuButton>
      </IonButtons>
      <IonTitle class="center">
        {{$t('result')}}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <IonCard v-for="(item,index) in problems" style="padding-bottom: 10px">
      <IonCardHeader>
        <IonCardSubtitle>{{ index + 1 }}/{{ problems.length }}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem color="transparent" lines="none">
          <IonImg class="center" :src="'images/sign/'+item.data.question+'Q.png'" style="width: 75%"/>
        </IonItem>
        <IonItem color="transparent" class="center" lines="none">
          <IonLabel color="dark" style="padding-bottom: 5px">{{ dataSource.signs[Number(item.data.trueFalse)-1].A }}</IonLabel>
        </IonItem>
        <IonLabel>
          {{$t('answer')}} {{$t(':')}} {{ item.data.ans === 1 ? $t('true') : $t('false') }}
          ( {{$t('your')}}{{$t('answer')}} {{$t(':')}} {{ chooseAns[index] === 1 ? $t('true') : $t('false') }} )<br>
          <IonIcon v-if="item.data.ans === chooseAns[index]" :icon="checkmark" size="large" style="color: green"></IonIcon>
          <IonIcon v-if="item.data.ans !== chooseAns[index]" :icon="close" size="large" style="color: red"></IonIcon>
        </IonLabel>
      </IonCardContent>
    </IonCard>
    <h5>{{$t('totalScore')}} : {{ totalScore }}</h5>
    <h5>{{$t('correctRate')}} : {{ Math.ceil((totalScore/problems.length)*100) }}%</h5>
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
  IonLabel, IonMenuButton,
} from '@ionic/vue';
import {checkmark, close} from "ionicons/icons";
import useData from "@/hooks/useData";
import dataSource from "@/json/dataSource.json";

const {getProblems, getTotalScore, getChooseAns} = useData();
const problems = getProblems('trueFalseSignProblems');
const chooseAns = getChooseAns('userTrueFalseSignValues');
const totalScore = getTotalScore('trueFalseSignProblems', 'userTrueFalseSignValues');

</script>

<style scoped>

</style>
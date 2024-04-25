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
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("1")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{ dataSource.signs[Number(item.choice1)-1].A }}</label>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("2")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{ dataSource.signs[Number(item.choice2)-1].A }}</label>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("3")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{ dataSource.signs[Number(item.choice3)-1].A }}</label>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          <label style="color: black; font-weight: bold"> {{$t("4")}}{{$t(".")}}&nbsp;&nbsp;</label>
          <label style="color: black; width: 100%">{{ dataSource.signs[Number(item.choice4)-1].A }}</label>
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
  IonImg,
  IonLabel,
} from '@ionic/vue';
import {checkmark, close, flask} from "ionicons/icons";
import useData from "@/hooks/useData";
import dataSource from "@/json/dataSource.json";

const {getProblems, getTotalScore, getChooseAns} = useData();
const problems = getProblems('multipleChoiceSignProblems');
const chooseAns = getChooseAns('userMultipleChoiceSignValues');
const totalScore = getTotalScore('multipleChoiceSignProblems', 'userMultipleChoiceSignValues');

</script>

<style scoped>

</style>
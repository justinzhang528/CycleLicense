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
        <IonIcon :icon="flask"></IonIcon>
        {{$t('result')}}
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <IonCard v-for="(item,index) in problems" style="padding-bottom: 10px">

      <div v-if="item.type === 'multipleChoiceSign'">
        <IonCardHeader>
          <IonCardSubtitle>{{ index + 1 }}/{{ problems.length }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem color="transparent" lines="none">
            <IonImg class="center" :src="'images/sign/'+item.data.question+'Q.png'" style="width: 75%"/>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <label style="font-weight: bold"> ({{$t("1")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.signs[Number(item.data.choice1)-1].A }}</label>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <label style="font-weight: bold"> ({{$t("2")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.signs[Number(item.data.choice2)-1].A }}</label>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <label style="font-weight: bold"> ({{$t("3")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.signs[Number(item.data.choice3)-1].A }}</label>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <label style="font-weight: bold"> ({{$t("4")}})&nbsp;</label>
            <label style="width: 100%">{{ dataSource.signs[Number(item.data.choice4)-1].A }}</label>
          </IonItem>
          <IonLabel>
            {{$t('answer')}} {{$t(':')}} {{ $t(item.data.ans) }}
            ( {{$t('your')}}{{$t('answer')}} {{$t(':')}} {{ $t(chooseAns[index].toString()) }} )<br>
            <IonIcon v-if="item.data.ans === chooseAns[index]" :icon="checkmark" size="large" style="color: green"></IonIcon>
            <IonIcon v-if="item.data.ans !== chooseAns[index]" :icon="close" size="large" style="color: red"></IonIcon>
          </IonLabel>
        </IonCardContent>
      </div>

      <div v-if="item.type === 'multipleChoiceRule'">
        <IonCardHeader>
          <IonCardSubtitle>{{ index + 1 }}/{{ problems.length }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem color="transparent" class="center" lines="none">
            <IonLabel color="dark">{{ dataSource.rules[Number(item.data.question)-1].Q }}</IonLabel>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <label style="font-weight: bold"> ({{$t("1")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.rules[Number(item.data.choice1)-1].A }}</label>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <label style="font-weight: bold"> ({{$t("2")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.rules[Number(item.data.choice2)-1].A }}</label>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <label style="font-weight: bold"> ({{$t("3")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.rules[Number(item.data.choice3)-1].A }}</label>
          </IonItem>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <label style="font-weight: bold"> ({{$t("4")}})&nbsp;&nbsp;</label>
            <label style="width: 100%">{{ dataSource.rules[Number(item.data.choice4)-1].A }}</label>
          </IonItem>
          <IonLabel>
            {{$t('answer')}} {{$t(':')}} {{ $t(item.data.ans) }}
            ( {{$t('your')}}{{$t('answer')}} {{$t(':')}} {{ $t(chooseAns[index].toString()) }} )<br>
            <IonIcon v-if="item.data.ans === chooseAns[index]" :icon="checkmark" size="large" style="color: green"></IonIcon>
            <IonIcon v-if="item.data.ans !== chooseAns[index]" :icon="close" size="large" style="color: red"></IonIcon>
          </IonLabel>
        </IonCardContent>
      </div>

      <div v-if="item.type === 'trueFalseSign'">
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
      </div>

      <div v-if="item.type === 'trueFalseRule'">
        <IonCardHeader>
          <IonCardSubtitle>{{ index + 1 }}/{{ problems.length }}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <div align="left">
            <IonLabel color="dark" style="font-weight: bold; padding-right: 5px">{{$t('question')}} {{$t(':')}}</IonLabel>
            <IonLabel color="dark">{{ dataSource.rules[Number(item.data.question)-1].Q }}</IonLabel><br><br>
            <IonLabel color="dark" style="font-weight: bold; padding-right: 5px">{{$t('answer')}} {{$t(':')}} </IonLabel>
            <IonLabel color="dark">{{ dataSource.rules[Number(item.data.trueFalse)-1].A }}</IonLabel><br><br>
          </div>
          <IonLabel>
            {{$t('answer')}} {{$t(':')}} {{ item.data.ans === 1 ? $t('true') : $t('false') }}
            ( {{$t('your')}}{{$t('answer')}} {{$t(':')}} {{ chooseAns[index] === 1 ? $t('true') : $t('false') }} )<br>
            <IonIcon v-if="item.data.ans === chooseAns[index]" :icon="checkmark" size="large" style="color: green"></IonIcon>
            <IonIcon v-if="item.data.ans !== chooseAns[index]" :icon="close" size="large" style="color: red"></IonIcon>
          </IonLabel>
        </IonCardContent>
      </div>

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
import {checkmark, close, flask} from "ionicons/icons";
import useData from "@/hooks/useData";
import dataSource from "@/json/dataSource.json";

const {getProblems, getTotalScore, getChooseAns} = useData();
const problems = getProblems('comprehensiveTestProblems');
const chooseAns = getChooseAns('comprehensiveTestUserChooseValues');
const totalScore = getTotalScore('comprehensiveTestProblems', 'comprehensiveTestUserChooseValues');

</script>

<style scoped>

</style>
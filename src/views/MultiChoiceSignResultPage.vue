<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonIcon :icon="flask"></IonIcon>
        Result
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <h5>Total Score: {{ totalScore }}</h5>
    <IonCard v-for="(item,index) in problems" style="padding-bottom: 10px">
      <IonCardHeader>
        <IonCardSubtitle>{{ index + 1 }}/{{ problems.length }}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem color="transparent" lines="none">
          <IonImg class="center" :src="item.questionPath" style="width: 75%"/>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          1.&nbsp;&nbsp;<IonImg :src="item.choice1Path" style="width: 90%"/>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          2.&nbsp;&nbsp;<IonImg :src="item.choice2Path" style="width: 90%"/>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          3.&nbsp;&nbsp;<IonImg :src="item.choice3Path" style="width: 90%"/>
        </IonItem>
        <IonItem color="transparent" class="center ion-item-border" lines="none">
          4.&nbsp;&nbsp;<IonImg :src="item.choice4Path" style="width: 90%"/>
        </IonItem>
        <IonLabel>
          Answer: {{ item.ans }}
          ( Your Answer: {{ chooseAns[index] }} )
          <IonIcon v-if="item.ans == chooseAns[index]" :icon="checkmark" style="color: green"></IonIcon>
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

const {getProblems, getTotalScore, getChooseAns} = useImageData();
const problems = getProblems('choiceSignProblems');
const chooseAns = getChooseAns('userChoiceSignValues');
const totalScore = getTotalScore('choiceSignProblems', 'userChoiceSignValues');

</script>

<style scoped>

</style>
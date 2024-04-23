<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonLabel>Mock Test</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonImg src="images/mockTest.png" style="width: 75%; display: block; margin: 10px auto;"></IonImg>
    <IonNavLink routerDirection="forward" :component="multiChoiceSign">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="listCircle"/>
        <IonLabel style="padding-left: 10px">Multiple Choice - Sign</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="listCircle"/>
        <IonLabel style="padding-left: 10px">Multiple Choice - Rule</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="checkmarkDone"/>
        <IonLabel style="padding-left: 10px">True/False - Sign</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="checkmarkDone"/>
        <IonLabel style="padding-left: 10px">True/False - Rule</IonLabel>
      </IonItem>
    </IonNavLink>
  </IonContent>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonLabel,
  IonNavLink,
  IonItem, IonImg
} from "@ionic/vue";
import {listCircle, checkmarkDone} from "ionicons/icons";
import {markRaw} from "vue";
import MultiChoiceSign from "@/views/MultiChoiceSignPage.vue";
// import MultiChoiceRule from "@/views/MultiChoiceSignPage.vue";
// import TrueFalseSign from "@/views/MultiChoiceSignPage.vue";
// import TrueFalseRule from "@/views/MultiChoiceSignPage.vue";

const multiChoiceSign = markRaw(MultiChoiceSign);
// const multiChoiceRule = markRaw(MultiChoiceRule);
// const trueFalseSign = markRaw(TrueFalseSign);
// const trueFalseRule = markRaw(TrueFalseRule);
</script>

<style scoped>

</style>
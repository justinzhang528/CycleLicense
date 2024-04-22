<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle align="center">
        <IonLabel>Study</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonNavLink routerDirection="forward" :component="studySignPage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="accessibility"/>
        <IonLabel style="padding-left: 10px">Sign</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" :component="studyRulePage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="newspaper"/>
        <IonLabel style="padding-left: 10px">Rule</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="star"/>
        <IonLabel style="padding-left: 10px">Sign Bookmark</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="star"/>
        <IonLabel style="padding-left: 10px">Rule Bookmark</IonLabel>
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
  IonItem
} from "@ionic/vue";
import {accessibility, newspaper, star} from "ionicons/icons";
import {markRaw} from "vue";
import StudySignPage from "@/views/StudySignPage.vue";
import StudyRulePage from "@/views/StudyRulePage.vue";

const studySignPage = markRaw(StudySignPage);
const studyRulePage = markRaw(StudyRulePage);
</script>

<style scoped>

</style>
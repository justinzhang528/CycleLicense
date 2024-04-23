<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton></IonBackButton>
      </IonButtons>
      <IonTitle class="center">
        <IonLabel>Study</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonNavLink routerDirection="forward" :component="studySignPage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="trailSign"/>
        <IonLabel style="padding-left: 10px">Sign</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" :component="studyRulePage" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="newspaper"/>
        <IonLabel style="padding-left: 10px">Rule</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" :component="signBookmarkPage" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="bookmark"/>
        <IonLabel style="padding-left: 10px">Sign Bookmark</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" :component="ruleBookmarkPage" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="bookmark"/>
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
import {trailSign, newspaper, bookmark} from "ionicons/icons";
import {markRaw} from "vue";
import StudySignPage from "@/views/StudySignPage.vue";
import StudyRulePage from "@/views/StudyRulePage.vue";
import SignBookmarkPage from "@/views/SignBookmarkPage.vue";
import RuleBookmarkPage from "@/views/RuleBookmarkPage.vue";

const studySignPage = markRaw(StudySignPage);
const studyRulePage = markRaw(StudyRulePage);
const signBookmarkPage = markRaw(SignBookmarkPage);
const ruleBookmarkPage = markRaw(RuleBookmarkPage);
</script>

<style scoped>

</style>
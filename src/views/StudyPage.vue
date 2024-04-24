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
        <IonLabel>{{$t('study')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonImg src="images/study.png" style="width: 75%; display: block; margin: 10px auto;"></IonImg>
    <IonNavLink routerDirection="forward" :component="studySignPage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="trailSign"/>
        <IonLabel style="padding-left: 10px">{{$t('sign')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" :component="studyRulePage" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="newspaper"/>
        <IonLabel style="padding-left: 10px">{{$t('rule')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" :component="signBookmarkPage" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="bookmark"/>
        <IonLabel style="padding-left: 10px">{{$t('signBookmark')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" :component="ruleBookmarkPage" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="bookmark"/>
        <IonLabel style="padding-left: 10px">{{$t('ruleBookmark')}}</IonLabel>
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
  IonItem, IonImg, IonMenuButton
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
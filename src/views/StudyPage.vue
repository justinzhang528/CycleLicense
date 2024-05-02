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
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/signIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('sign')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" :component="studyRulePage" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/ruleIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('rule')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" :component="signBookmarkPage" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/bookmarkIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('signBookmark')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" :component="ruleBookmarkPage" style="padding: 50px">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/bookmarkIcon.png'">
        </IonThumbnail>
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
  IonLabel,
  IonNavLink,
  IonItem, IonImg, IonMenuButton, IonThumbnail
} from "@ionic/vue";
import {markRaw} from "vue";
import StudySignPage from "@/views/StudySignPage.vue";
import StudyRulePage from "@/views/StudyRulePage.vue";
import SignBookmarkPage from "@/views/SignBookmarkPage.vue";
import RuleBookmarkPage from "@/views/RuleBookmarkPage.vue";
import useAdmob from "@/hooks/useAdmob";

const studySignPage = markRaw(StudySignPage);
const studyRulePage = markRaw(StudyRulePage);
const signBookmarkPage = markRaw(SignBookmarkPage);
const ruleBookmarkPage = markRaw(RuleBookmarkPage);
const {showInterstitial} = useAdmob();
showInterstitial();
</script>

<style scoped>

</style>
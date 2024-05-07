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
        <IonLabel>{{$t('mockTest')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonImg src="images/mockTest.png" style="width: 75%; display: block; margin: 10px auto;"></IonImg>
    <IonNavLink routerDirection="forward" :component="multipleChoicePage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/icon/multipleChoiceIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('multipleChoice')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px" :component="trueFalsePage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/icon/trueFalseIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('trueFalse')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px" :component="comprehensiveTestPage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/icon/comprehensiveTestIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('comprehensiveTest')}}</IonLabel>
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
import MultipleChoicePage from "@/views/Page/MultipleChoicePage.vue";
import TrueFalsePage from "@/views/Page/TrueFalsePage.vue";
import ComprehensiveTestPage from "@/views/Page/ComprehensiveTestPage.vue";

const multipleChoicePage = markRaw(MultipleChoicePage);
const trueFalsePage = markRaw(TrueFalsePage);
const comprehensiveTestPage = markRaw(ComprehensiveTestPage);
</script>

<style scoped>

</style>
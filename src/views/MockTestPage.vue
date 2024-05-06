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
    <IonNavLink routerDirection="forward" :component="multipleChoiceSignPage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/icon/multipleChoiceIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('multipleChoiceSign')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px" :component="multipleChoiceRulePage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/icon/multipleChoiceIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('multipleChoiceRule')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px" :component="trueFalseSignPage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/icon/trueFalseIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('trueFalseSign')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px" :component="trueFalseRulePage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/icon/trueFalseIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('trueFalseRule')}}</IonLabel>
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
import MultiChoiceSignPage from "@/views/MultipleChoiceSignPage.vue";
import MultiChoiceRulePage from "@/views/MultipleChoiceRulePage.vue";
import TrueFalseSignPage from "@/views/TrueFalseSignPage.vue";
import TrueFalseRulePage from "@/views/TrueFalseRulePage.vue";
import ComprehensiveTestPage from "@/views/ComprehensiveTestPage.vue";

const multipleChoiceSignPage = markRaw(MultiChoiceSignPage);
const multipleChoiceRulePage = markRaw(MultiChoiceRulePage);
const trueFalseSignPage = markRaw(TrueFalseSignPage);
const trueFalseRulePage = markRaw(TrueFalseRulePage);
const comprehensiveTestPage = markRaw(ComprehensiveTestPage);
</script>

<style scoped>

</style>
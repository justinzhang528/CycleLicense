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
        <IonLabel>{{$t('trueFalse')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonImg src="images/trueFalse.png" style="width: 75%; display: block; margin: 10px auto;"></IonImg>
    <IonNavLink routerDirection="forward" style="padding: 50px" :component="trueFalseSignPage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/icon/signIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('sign')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px" :component="trueFalseRulePage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/icon/ruleIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('rule')}}</IonLabel>
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
import TrueFalseSignPage from "@/views/Page/TrueFalseSignPage.vue";
import TrueFalseRulePage from "@/views/Page/TrueFalseRulePage.vue";

const trueFalseSignPage = markRaw(TrueFalseSignPage);
const trueFalseRulePage = markRaw(TrueFalseRulePage);
</script>

<style scoped>

</style>
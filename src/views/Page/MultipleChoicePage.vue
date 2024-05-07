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
        <IonLabel>{{$t('multipleChoice')}}</IonLabel>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonImg src="images/multipleChoice.png" style="width: 75%; display: block; margin: 10px auto;"></IonImg>
    <IonNavLink routerDirection="forward" :component="multipleChoiceSignPage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonThumbnail slot="start">
          <img alt="language" :src="'images/icon/signIcon.png'">
        </IonThumbnail>
        <IonLabel style="padding-left: 10px">{{$t('sign')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px" :component="multipleChoiceRulePage">
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
import MultiChoiceSignPage from "@/views/Page/MultipleChoiceSignPage.vue";
import MultiChoiceRulePage from "@/views/Page/MultipleChoiceRulePage.vue";

const multipleChoiceSignPage = markRaw(MultiChoiceSignPage);
const multipleChoiceRulePage = markRaw(MultiChoiceRulePage);
</script>

<style scoped>

</style>
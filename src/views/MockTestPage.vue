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
        <IonIcon :icon="listCircle"/>
        <IonLabel style="padding-left: 10px">{{$t('multipleChoiceSign')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px" :component="multipleChoiceRulePage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="listCircle"/>
        <IonLabel style="padding-left: 10px">{{$t('multipleChoiceRule')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px" :component="trueFalseSignPage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="checkmarkDone"/>
        <IonLabel style="padding-left: 10px">{{$t('trueFalseSign')}}</IonLabel>
      </IonItem>
    </IonNavLink>
    <IonNavLink routerDirection="forward" style="padding: 50px" :component="trueFalseRulePage">
      <IonItem button detail lines="none" class="ion-item-border">
        <IonIcon :icon="checkmarkDone"/>
        <IonLabel style="padding-left: 10px">{{$t('trueFalseRule')}}</IonLabel>
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
import {listCircle, checkmarkDone} from "ionicons/icons";
import {markRaw} from "vue";
import MultiChoiceSignPage from "@/views/MultipleChoiceSignPage.vue";
import MultiChoiceRulePage from "@/views/MultipleChoiceRulePage.vue";
import TrueFalseSignPage from "@/views/TrueFalseSignPage.vue";
import TrueFalseRulePage from "@/views/TrueFalseRulePage.vue";
import useAdmob from "@/hooks/useAdmob";

const multipleChoiceSignPage = markRaw(MultiChoiceSignPage);
const multipleChoiceRulePage = markRaw(MultiChoiceRulePage);
const trueFalseSignPage = markRaw(TrueFalseSignPage);
const trueFalseRulePage = markRaw(TrueFalseRulePage);
const {showRewardVideo} = useAdmob();
showRewardVideo();
</script>

<style scoped>

</style>